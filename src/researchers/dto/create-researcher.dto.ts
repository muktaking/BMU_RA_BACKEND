import {
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProfileDto } from 'src/users/dto/create-user.dto';

export class CreateResearcherDto extends ProfileDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  publication: Array<string>;

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  awards: Array<string>;

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  int_affiliation: Array<string>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  editor_in_Journal: Array<string>;
}
