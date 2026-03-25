import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as csv from 'csv-parser';
import * as fs from 'fs';
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

  async createAnScale(createScaleDto: CreateScaleDto, filePath: string = '') {
    console.log(filePath);
    const scale = new Scale();

    const validators: Researcher[] = await this.findResearhcerByIds(
      createScaleDto.validator_id,
    );

    Object.assign(scale, createScaleDto);
    scale.validators = validators;
    scale.server_link = filePath;

    const [err, resOnSave] = await to(this.scaleRepository.save(scale));

    if (err)
      throw new InternalServerErrorException({
        message: 'Scale Data could not be created due to server error.',
        data: err,
      });

    return { message: 'Scale is created successfully', data: resOnSave };
  }

  async createScalesByUploadByCSV(res, file) {
    const results: Array<CreateScaleDto> = [];

    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (data: CreateScaleDto) => results.push(data))
      .on('end', () => {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.log(err);
          }
        });
        Promise.all(
          results.map(async (scalePartialData) => {
            const scale = new CreateScaleDto();
            scale.title = scalePartialData.title;
            scale.short_title = scalePartialData.short_title;
            scale.validator_id = scalePartialData.validator_id;
            scale.validator_name = scalePartialData.validator_name;
            scale.validation_year = scalePartialData.validation_year;
            scale.description = scalePartialData.title;
            scale.publisher = scalePartialData.publisher
              ? scalePartialData.publisher
              : '';
            scale.publication_link = scalePartialData?.publication_link;
            scale.server_link = scalePartialData?.server_link;
            scale.tags = scalePartialData?.tags;

            await this.createAnScale(scale);
          }),
        )
          .then((response) => {
            res.json({ message: 'Successfully Uploaded Scales' });
          })
          .catch((error) => {
            console.log(error);
            res.status(HttpStatus.CONFLICT).json({ message: error.message });
          });
      });
  }

  async findAllScales(limit: number) {
    const [err, articles] = await to(
      this.scaleRepository.find({ take: limit, order: { id: 'DESC' } }),
    );

    if (err)
      throw new InternalServerErrorException({
        message: 'Scales Data could not be retrived due to server error.',
        data: err,
      });

    return articles;
  }

  async findArticleById(id: number) {
    const [err, scale] = await to(this.scaleRepository.findOneBy({ id: id }));

    if (err)
      throw new InternalServerErrorException({
        message: 'Articles Data could not be retrived due to server error.',
        data: err,
      });

    if (!scale)
      throw new BadRequestException('Scale is not present on the database.');

    return scale;
  }

  /**
   * Adds two numbers together.
   *
   * @param id - id number
   * @param updateScaleDto - The scale update fields
   * @returns error or response
   */

  async updateAScaleById(
    id: number,
    updateScaleDto: UpdateScaleDto,
    filePath: string = '',
  ) {
    let errOnUpdate;
    let resOnUpdate;

    let scale = await this.scaleRepository.findOneBy({ id: id });
    if (!scale)
      throw new BadRequestException('Article is not present on the database.');

    Object.assign(scale, updateScaleDto); // update scale object with new values from updateScaleDto
    scale.server_link = filePath;

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
