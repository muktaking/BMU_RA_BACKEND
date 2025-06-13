import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Scale } from './scale.entity';
import { Repository } from 'typeorm';
import { CreateScaleDto } from './dto/create-scale.dto';
import { to } from 'src/utils/utils';
import { UpdateScaleDto } from './dto/update-scale.dto';

@Injectable()
export class ScalesService {
  constructor(
    @InjectRepository(Scale) private scaleRepository: Repository<Scale>,
  ) {}

  async createAnScale(createScaleDto: CreateScaleDto) {
    const article = new Scale();

    const [err, resOnSave] = await to(
      this.scaleRepository.save({
        ...createScaleDto,
        author: createScaleDto.author?.join(','),
        validator: createScaleDto.validator?.join(','),
        tags: createScaleDto.tags?.join(','),
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

  async updateAScaleById(id: number, updateScaleDto: UpdateScaleDto) {
    const [errOnUpdate, resOnUpdate] = await to(
      this.scaleRepository.update(id, {
        ...updateScaleDto,
        author: updateScaleDto.author?.join(','),
        validator: updateScaleDto.validator?.join(','),
        tags: updateScaleDto.tags?.join(','),
      }),
    );

    if (errOnUpdate)
      throw new InternalServerErrorException(errOnUpdate.message);

    if (resOnUpdate.affected > 0) {
      return { message: 'Scale data edited successfully' };
    } else
      throw new HttpException(
        'No data is saved. Either no data is sent or no entry is present.',
        HttpStatus.NO_CONTENT,
      );
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
