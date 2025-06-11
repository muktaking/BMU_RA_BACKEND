import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Researcher } from './researcher.entity';
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
    const [errOnUpdate, resOnUpdate] = await to(
      this.researcherRepository.update(id, {
        ...updateResearcherDto,
        publication: updateResearcherDto.publication?.join(','),
        awards: updateResearcherDto.awards?.join(','),
        int_affiliation: updateResearcherDto.int_affiliation?.join(','),
        editor_in_Journal: updateResearcherDto.editor_in_Journal?.join(','),
      }),
    );

    if (errOnUpdate)
      throw new InternalServerErrorException(errOnUpdate.message);

    if (resOnUpdate.affected > 0) {
      return { message: 'Researcher data edited successfully' };
    } else
      throw new HttpException(
        'No data is saved. Either no data is sent or no entry is present.',
        HttpStatus.NO_CONTENT,
      );
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
