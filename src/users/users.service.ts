import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { to } from 'src/utils/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

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
    //hashing password
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(createUser.password, salt);
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
    const [errOnUpdate, resOnUpdate] = await to(
      this.userRepository.update(id, updateUserDto),
    );

    if (errOnUpdate)
      throw new InternalServerErrorException(errOnUpdate.message);

    if (resOnUpdate.affected > 0) {
      return { message: 'User data edited successfully' };
    } else
      throw new HttpException(
        'No data is saved. Either no data is sent or no entry is present.',
        HttpStatus.NO_CONTENT,
      );
  }

  async deleteUser(id: number) {
    const [errOnDelete, resOnDelete] = await to(this.userRepository.delete(id));

    if (errOnDelete)
      throw new InternalServerErrorException(errOnDelete.message);

    return { message: `User deleted successfully.`, data: resOnDelete };
  }
}
