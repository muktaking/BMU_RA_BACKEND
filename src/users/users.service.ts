import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, SocialProfile } from './user.entity';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { to } from 'src/utils/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string) {
    const [err, user] = await to(this.userRepository.findBy({ email: email }));
    if (err)
      throw new InternalServerErrorException(
        'User data could not be retrived due to server error.',
      );

    return user[0]; //user is an array
  }

  // Creating an user

  async createUser(createUser: CreateUserDto) {
    const user = new User();
    user.firstname = createUser.firstname;
    user.lastname = createUser.lastname;
    user.username = createUser.username;
    user.avatar = 'neutral';
    user.email = createUser.email;
    user.gender = createUser.gender;
    user.phone = createUser.phone;
    user.degree = createUser.degree;
    user.institute = createUser.institute;
    user.address = createUser.address;
    user.role = 1;
    user.socialProfiles = [];

    try {
      //intregating socialProfile
      createUser?.socialProfile.forEach((profile) => {
        const sProfile = new SocialProfile();
        sProfile.platform = profile.platform;
        sProfile.url = profile.profileLink;
        user.socialProfiles.push(sProfile);
      });

      //hashing password
      const salt = await genSalt(10);
      user.password = await hash(createUser.password, salt);
      const userEntryRes = await this.userRepository.save(user);
      return userEntryRes;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          `'${user.email}' is already exist.`,
          HttpStatus.CONFLICT,
        );
        //throw new ConflictException(`Email: ['${email}'] is already exist.`);
      } else
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const [err, [user]] = await to(this.userRepository.findBy({ id: id }));
    if (err) throw new InternalServerErrorException(err.message);

    if (updateUserDto.socialProfile) {
      if (user.socialProfiles?.length < 1) user.socialProfiles = []; // if user does not socialProfiles previously

      // iterate updated socialProfiles to update or add new ones
      updateUserDto.socialProfile?.forEach((sProfile) => {
        // find whether old one exists
        const editedProfiles = user?.socialProfiles?.find(
          (uProfile) => uProfile.platform === sProfile.platform,
        );

        if (editedProfiles) editedProfiles.url = sProfile.profileLink;

        //save new one
        if (!editedProfiles) {
          const newProfile = new SocialProfile();
          newProfile.platform = sProfile.platform;
          newProfile.url = sProfile.profileLink;
          user.socialProfiles.push(newProfile);
        }
      });

      //delete socialProfile so that it does not wrongly assinged again
      delete updateUserDto.socialProfile;
    }

    Object.assign(user, updateUserDto);

    const [errOnUpdate, resOnUpdate] = await to(this.userRepository.save(user));

    if (errOnUpdate)
      throw new InternalServerErrorException(errOnUpdate.message);

    return { message: 'User data edited successfully' };
  }

  async deleteUser(id: number) {
    const [errOnDelete, resOnDelete] = await to(this.userRepository.delete(id));

    if (errOnDelete)
      throw new InternalServerErrorException(errOnDelete.message);

    return { message: `User deleted successfully.`, data: resOnDelete };
  }
}
