import { BaseEntity, Timestamp } from 'typeorm';
import { SocialProfile } from './social-profile.entity';
import { Session as SessionEntity } from '../authentication/Session.entity';
import { Account as AccountEntity } from '../authentication/Account.entity';
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
    id: string;
    firstname: string;
    lastname: string;
    name: string;
    image: string;
    email: string;
    emailVerified: boolean;
    gender: Gender;
    phone: string;
    degree: string;
    designation: string;
    institute: Institute;
    address: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
export declare class User extends Profile {
    role: string;
    sessions: SessionEntity[];
    accounts: AccountEntity[];
    socialProfiles: SocialProfile[];
}
