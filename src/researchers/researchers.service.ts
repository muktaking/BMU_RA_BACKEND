import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Researcher, SocialProfileResearcher } from './researcher.entity';
import { to } from 'src/utils/utils';
import { CreateResearcherDto } from './dto/create-researcher.dto';
import { UpdateResearcherDto } from './dto/update-researcher.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ResearchersService {
  constructor(
    @InjectRepository(Researcher)
    private researcherRepository: Repository<Researcher>,
  ) {}

  async findAllResearchers() {
    const [err, researchers] = await to(this.researcherRepository.find());

    if (err)
      throw new InternalServerErrorException(
        'Researchers Could not be find due to Database server error',
      );

    return researchers;
  }

  async findResearhcerById(id: number) {
    const [err, researcher] = await to(
      this.researcherRepository.findBy({ id: id }),
    );

    if (err)
      throw new InternalServerErrorException(
        `Researcher of ${id} Could not be find due to Database server error`,
      );

    return researcher;
  }

  async findResearhcerByIds(ids: number[]) {
    const [err, researcher] = await to(
      this.researcherRepository.find({
        where: {
          id: In(ids),
        },
      }),
    );

    if (err)
      throw new InternalServerErrorException(
        `List of Researchers could not be find due to database server error`,
      );

    return researcher;
  }

  async createResearcher(createResearcherDto: CreateResearcherDto) {
    const researcher = new Researcher();
    researcher.firstname = createResearcherDto.firstname;
    researcher.lastname = createResearcherDto.lastname;
    researcher.username = createResearcherDto.username;
    researcher.avatar = 'neutral';
    researcher.email = createResearcherDto.email;
    researcher.gender = createResearcherDto.gender;
    researcher.phone = createResearcherDto.phone;
    researcher.degree = createResearcherDto.degree;
    researcher.institute = createResearcherDto.institute;
    researcher.address = createResearcherDto.address;
    researcher.publication = createResearcherDto.publication?.join(',');
    researcher.awards = createResearcherDto.awards?.join(',');
    researcher.int_affiliation = createResearcherDto.int_affiliation?.join(',');
    researcher.editor_in_Journal =
      createResearcherDto.editor_in_Journal?.join(',');
    researcher.socialProfiles = [];

    //intregating socialProfile
    createResearcherDto?.socialProfileResearcher.forEach((profile) => {
      const sProfile = new SocialProfileResearcher();
      sProfile.platform = profile.platform;
      sProfile.url = profile.profileLink;
      researcher.socialProfiles.push(sProfile);
    });

    const [err, resOnSave] = await to(
      this.researcherRepository.save(researcher),
    );

    if (err)
      throw new InternalServerErrorException({
        message:
          'Researcher Profile could not be created due to database error.',
        error: err,
      });

    return resOnSave;
  }

  async updateResearcherById(
    id: number,
    updateResearcherDto: UpdateResearcherDto,
  ) {
    const [err, [researcher]] = await to(
      this.researcherRepository.findBy({ id: id }),
    );
    if (err) throw new InternalServerErrorException(err.message);

    if (updateResearcherDto.socialProfileResearcher) {
      if (researcher.socialProfiles?.length < 1) researcher.socialProfiles = []; // if user does not socialProfiles previously

      // iterate updated socialProfiles to update or add new ones
      updateResearcherDto.socialProfileResearcher?.forEach((sProfile) => {
        // find whether old one exists
        const editedProfiles = researcher?.socialProfiles?.find(
          (uProfile) => uProfile.platform === sProfile.platform,
        );

        if (editedProfiles) editedProfiles.url = sProfile.profileLink;

        //save new one
        if (!editedProfiles) {
          const newProfile = new SocialProfileResearcher();
          newProfile.platform = sProfile.platform;
          newProfile.url = sProfile.profileLink;
          researcher.socialProfiles.push(newProfile);
        }
      });

      //delete socialProfile so that it does not wrongly assinged again
      delete updateResearcherDto.socialProfileResearcher;
    }

    Object.assign(researcher, {
      ...updateResearcherDto,
      publication: updateResearcherDto.publication?.join(','),
      awards: updateResearcherDto.awards?.join(','),
      int_affiliation: updateResearcherDto.int_affiliation?.join(','),
      editor_in_Journal: updateResearcherDto.editor_in_Journal?.join(','),
    });

    const [errOnUpdate, resOnUpdate] = await to(
      this.researcherRepository.save(researcher),
    );

    if (errOnUpdate)
      throw new InternalServerErrorException(errOnUpdate.message);

    return { message: 'Researcher data edited successfully' };
  }

  async deleteResearcherById(id: number) {
    const [errOnDelete, resOnDelete] = await to(
      this.researcherRepository.delete(id),
    );

    if (errOnDelete)
      throw new InternalServerErrorException(errOnDelete.message);

    return { message: `Researcher deleted successfully.`, data: resOnDelete };
  }
}
