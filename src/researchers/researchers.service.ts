import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Researcher, SocialProfileResearcher } from './researcher.entity';
import { to } from 'src/utils/utils';
import {
  CreateResearcherDto,
  SocialProfileResearcherDto,
} from './dto/create-researcher.dto';
import { UpdateResearcherDto } from './dto/update-researcher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { SocialProfileDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class ResearchersService {
  constructor(
    @InjectRepository(Researcher)
    private researcherRepository: Repository<Researcher>,
  ) {}

  // async findAllResearchers() {
  //   const [err, researchers] = await to(this.researcherRepository.find());

  //   if (err)
  //     throw new InternalServerErrorException(
  //       'Researchers Could not be find due to Database server error',
  //     );

  //   return researchers;
  // }

  async findAllResearchersWithLimit(limit: number) {
    const [err, researchers] = await to(
      this.researcherRepository.find({ take: limit }),
    );

    if (err)
      throw new InternalServerErrorException(
        'Researchers Could not be find due to Database server error',
      );

    return researchers;
  }

  async findResearhcerById(id: number) {
    const [err, researcher] = await to(
      this.researcherRepository.findOneBy({ id: id }),
    );

    if (err)
      throw new InternalServerErrorException(
        `Researcher of ${id} Could not be find due to Database server error`,
      );

    return researcher;
  }

  async findResearhcerByInstituteId(institute_id: number) {
    console.log(institute_id);
    const [err, researchers] = await to(
      this.researcherRepository.findBy({ institute: institute_id }),
    );

    if (err)
      throw new InternalServerErrorException(
        `Researcheres Could not be find due to Database server error`,
      );

    return researchers;
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

  async createResearcher(
    createResearcherDto: CreateResearcherDto,
    filePath: string = 'neutral',
  ) {
    const researcher = new Researcher();
    researcher.firstname = createResearcherDto.firstname;
    researcher.lastname = createResearcherDto.lastname;
    researcher.username = createResearcherDto.username;
    researcher.email = createResearcherDto.email;
    researcher.gender = createResearcherDto.gender;
    researcher.phone = createResearcherDto.phone;
    researcher.degree = createResearcherDto.degree;
    researcher.institute = createResearcherDto.institute;
    researcher.address = createResearcherDto.address;
    //if avater is not null

    researcher.avatar = filePath;

    // if arrary of strings then join by comma, otherwise keep it as same
    researcher.publication = Array.isArray(createResearcherDto.publication)
      ? createResearcherDto.publication?.join(',')
      : createResearcherDto.publication;
    researcher.awards = Array.isArray(createResearcherDto.awards)
      ? createResearcherDto.awards?.join(',')
      : createResearcherDto.awards;
    researcher.int_affiliation = Array.isArray(
      createResearcherDto.int_affiliation,
    )
      ? createResearcherDto.int_affiliation?.join(',')
      : createResearcherDto.int_affiliation;
    researcher.editor_in_Journal = Array.isArray(
      createResearcherDto.editor_in_Journal,
    )
      ? createResearcherDto.editor_in_Journal?.join(',')
      : createResearcherDto.editor_in_Journal;
    researcher.socialProfiles = [];

    //intregating socialProfile
    createResearcherDto.socialProfileResearcher?.forEach((profile) => {
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
          'Researcher Profile could not be created due to database error. ' +
          err.message,
      });

    return resOnSave;
  }

  async createResearchersByUploadByCSV(res, file) {
    const results: Array<CreateResearcherDto> = [];

    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (data: CreateResearcherDto) => results.push(data))
      .on('end', () => {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.log(err);
          }
        });
        Promise.all(
          results.map(async (researcherPartialData) => {
            const researcher = new CreateResearcherDto();
            researcher.firstname = researcherPartialData.firstname;
            researcher.lastname = researcherPartialData.lastname;
            researcher.username = researcherPartialData.lastname?.toLowerCase();
            researcher.email = researcherPartialData.email;
            researcher.gender = researcherPartialData.gender;
            researcher.phone = researcherPartialData.phone;
            researcher.degree = researcherPartialData.degree;
            researcher.institute = researcherPartialData.institute;
            researcher.address = researcherPartialData.address;
            researcher.awards = researcherPartialData.awards;
            researcher.int_affiliation = researcherPartialData.int_affiliation;
            researcher.editor_in_Journal =
              researcherPartialData.editor_in_Journal;
            researcher.socialProfileResearcher = [];

            //below chain function will return array of arrays containing socialProfile key and value (e.g [[sp_facebook,'hhtp://facebook.com']])
            const socialProfiles = Object.entries(researcher).filter(([key]) =>
              key.startsWith('sp_'),
            );

            socialProfiles.forEach((socialProfile) => {
              const newProfile = new SocialProfileResearcherDto();
              newProfile.platform = socialProfile[0].split('_')[1];
              newProfile.profileLink = socialProfile[1];
              researcher.socialProfileResearcher.push(newProfile);
            });

            await this.createResearcher(researcher);
          }),
        )
          .then((response) => {
            res.json({ message: 'Successfully Uploaded Users' });
          })
          .catch((error) => {
            //console.log(error);
            res.status(HttpStatus.CONFLICT).json({ message: error.message });
          });
      });
  }

  async updateResearcherById(
    id: number,
    updateResearcherDto: UpdateResearcherDto,
    filePath: string,
  ) {
    const [err, [researcher]] = await to(
      this.researcherRepository.findBy({ id: id }),
    );
    if (err) throw new InternalServerErrorException(err.message);

    if (filePath !== '') {
      researcher.avatar = filePath;
    }

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
      publication: updateResearcherDto.publication,
      awards: updateResearcherDto.awards,
      int_affiliation: updateResearcherDto.int_affiliation,
      editor_in_Journal: updateResearcherDto.editor_in_Journal,
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
