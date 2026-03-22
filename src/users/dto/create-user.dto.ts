import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Gender, Institute, RolePermitted } from '../user.entity';
import { Type } from 'class-transformer';

export abstract class ProfileDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstname: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  username: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  avatar: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(['male', 'female'])
  gender: Gender;

  @IsOptional()
  phone: string;

  @IsOptional()
  degree: string;

  @IsOptional()
  @Type(() => Number)
  @IsEnum([1, 2, 3, 4, 5, 6, 7])
  institute: Institute;

  @IsOptional()
  address: string;
}

export class CreateUserDto extends ProfileDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and must be at least 6 characters long',
  })
  password: string;

  @IsOptional()
  role: RolePermitted;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialProfileDto)
  socialProfile: SocialProfileDto[];
}

export class SocialProfileDto {
  @IsString()
  @IsNotEmpty()
  platform: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  profileLink: string;
}
