import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PublicationDto } from 'src/articles/dto/create-article.dto';

export class CreateScaleDto extends PublicationDto {
  @IsString()
  @MaxLength(25)
  short_title: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  validator_id: Array<number>;

  @IsArray()
  @Type(() => String)
  validator_name: Array<string>;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  validation_year: Date | undefined;
}
