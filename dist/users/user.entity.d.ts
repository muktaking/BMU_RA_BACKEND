import { BaseEntity, Timestamp } from 'typeorm';
import { SocialProfile } from './social-profile.entity';
export declare enum RolePermitted {
    guest = 0,
    member = 1,
    researcher = 2,
    moderator = 3,
    coordinator = 4,
    admin = 5
}
export declare enum LoginProvider {
    local = 0,
    facebook = 1,
    google = 2
}
export declare enum Gender {
    male = "male",
    female = "female"
}
export declare enum Institute {
    bmu = 1,
    nimh = 2,
    somch = 3,
    afmc = 4,
    foreign = 6,
    local = 7
}
export declare abstract class Profile extends BaseEntity {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    avatar: string;
    email: string;
    gender: Gender;
    phone: string;
    degree: string;
    designation: string;
    institute: Institute;
    address: string;
}
export declare class User extends Profile {
    password: string;
    role: RolePermitted;
    createdAt: Timestamp;
    resetToken: string;
    resetTokenExpiration: Timestamp;
    socialProfiles: SocialProfile[];
}
