import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Scale } from './scale.entity';
import { In, Repository } from 'typeorm';
import { CreateScaleDto } from './dto/create-scale.dto';
import { to } from 'src/utils/utils';
import { UpdateScaleDto } from './dto/update-scale.dto';
import { Researcher } from 'src/researchers/researcher.entity';

@Injectable()
export class ScalesService {
  constructor(
    @InjectRepository(Scale) private scaleRepository: Repository<Scale>,
    @InjectRepository(Researcher)
    private researcherRepository: Repository<Researcher>,
  ) {}

  //Function to get researchers by array of ids
  //why use here - to inject repository not service
  async findResearhcerByIds(ids: number[]) {
    const [err, researchers] = await to(
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

    return researchers;
  }

  async createAnScale(createScaleDto: CreateScaleDto) {
    const authors: Researcher[] = await this.findResearhcerByIds(
      createScaleDto.author_id,
    );

    const validators: Researcher[] = await this.findResearhcerByIds(
      createScaleDto.validator_id,
    );

    const [err, resOnSave] = await to(
      this.scaleRepository.save({
        ...createScaleDto,
        authors,
        validators,
      }),
    );

    if (err)
      throw new InternalServerErrorException({
        message: 'Scale Data could not be created due to server error.',
        data: err,
      });

    return { message: 'Scale is created successfully', data: resOnSave };
  }

  async findAllScales() {
    const [err, articles] = await to(this.scaleRepository.find());

    if (err)
      throw new InternalServerErrorException({
        message: 'Scales Data could not be retrived due to server error.',
        data: err,
      });

    return articles;
  }

  /**
   * Adds two numbers together.
   *
   * @param id - id number
   * @param updateScaleDto - The scale update fields
   * @returns error or response
   */

  async updateAScaleById(id: number, updateScaleDto: UpdateScaleDto) {
    let errOnUpdate;
    let resOnUpdate;

    let scale = await this.scaleRepository.findOneBy({ id: id });
    if (!scale)
      throw new BadRequestException('Article is not present on the database.');

    Object.assign(scale, updateScaleDto); // update scale object with new values from updateScaleDto

    //get researchers data due to save in authors (many-to-many) field
    if (updateScaleDto?.author_id) {
      const researchers: Researcher[] = await this.findResearhcerByIds(
        updateScaleDto.author_id,
      );

      scale.authors = researchers;
    }

    if (updateScaleDto?.validator_id) {
      const researchers: Researcher[] = await this.findResearhcerByIds(
        updateScaleDto.validator_id,
      );

      scale.validators = researchers;
    }

    [errOnUpdate, resOnUpdate] = await to(this.scaleRepository.save(scale));
    //Using save instead of update bcz update can't work with relation

    if (errOnUpdate)
      throw new InternalServerErrorException(errOnUpdate.message);

    return { message: 'Article data edited successfully', data: resOnUpdate };
  }

  async deleteAScaleById(id: number) {
    const [errOnDelete, resOnDelete] = await to(
      this.scaleRepository.delete(id),
    );

    if (errOnDelete)
      throw new InternalServerErrorException(errOnDelete.message);

    return { message: `Scale deleted successfully.`, data: resOnDelete };
  }
}
