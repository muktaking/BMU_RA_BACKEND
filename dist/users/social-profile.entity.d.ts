import { User } from './user.entity';
export declare abstract class SocialProfileBase {
    id: number;
    platform: string;
    url: string;
}
export declare class SocialProfile extends SocialProfileBase {
    user: User;
}
