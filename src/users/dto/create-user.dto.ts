import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { Gender, Institute, RolePermitted } from '../user.entity';

export abstract class ProfileDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  firstname: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  username: string;

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
  @IsEnum([1, 2, 3, 4, 5, 6, 7])
  institute: Institute;

  @IsOptional()
  address: string;
}

export class CreateUserDto extends ProfileDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/, {
    message: 'Your Password is too weak',
  })
  password: string;

  @IsOptional()
  role: RolePermitted;
}
