import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { ProfileDto } from 'src/users/dto/create-user.dto';

export class CreateResearcherDto extends ProfileDto {
  @IsOptional()
  @IsString()
  publication: Array<string>;

  @IsOptional()
  @IsString()
  awards: Array<string>;

  @IsOptional()
  @IsString()
  int_affiliation: Array<string>;

  @IsOptional()
  @IsString()
  editor_in_Journal: Array<string>;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialProfileResearcherDto)
  socialProfileResearcher: SocialProfileResearcherDto[];
}

export class SocialProfileResearcherDto {
  @IsString()
  @IsNotEmpty()
  platform: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  profileLink: string;
}
