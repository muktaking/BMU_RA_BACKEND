import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export abstract class PublicationDto {
  @IsString()
  @MaxLength(255)
  title: string;

  //   @IsString()
  //   @MaxLength(15)
  //   short_title: string;

  @IsString()
  @MaxLength(255)
  description: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  author_id: Array<number>;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  publication_link: string | undefined;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  server_link: string | undefined;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  published_year: Date | undefined;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  publisher: string | undefined;

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  //   @Transform(({ value }) => (Array.isArray(value) ? value.join(',') : value))
  tags: Array<string>;
}

export class CreateArticleDto extends PublicationDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  doi: string | undefined;
}
