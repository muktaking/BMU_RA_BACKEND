import { Gender, Institute, RolePermitted } from '../user.entity';
export declare abstract class ProfileDto {
    firstname: string;
    lastname: string;
    username: string;
    avatar: string;
    email: string;
    gender: Gender;
    phone: string;
    degree: string;
    institute: Institute;
    address: string;
}
export declare class CreateUserDto extends ProfileDto {
    password: string;
    role: RolePermitted;
    socialProfile: SocialProfileDto[];
}
export declare class SocialProfileDto {
    platform: string;
    profileLink: string;
}
