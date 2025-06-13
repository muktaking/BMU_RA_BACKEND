import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PublicationDto } from 'src/articles/dto/create-article.dto';

export class CreateScaleDto extends PublicationDto {
  @IsString()
  @MaxLength(15)
  short_title: string;

  @IsArray()
  @IsString({ each: true })
  validator: Array<string>;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  validation_year: Date | undefined;
}
