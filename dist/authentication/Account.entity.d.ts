import { User as UserEntity } from '../users/user.entity';
export declare class Account {
    id: string;
    userId: string;
    user: UserEntity;
    accountId: string;
    providerId: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpiresAt?: Date;
    refreshTokenExpiresAt?: Date;
    scope?: string;
    idToken?: string;
    password?: string;
    createdAt: string;
    updatedAt: string;
}
