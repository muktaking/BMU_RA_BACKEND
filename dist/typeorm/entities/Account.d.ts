import { User } from './User';
export declare class Account {
    id: string;
    accountId: string;
    providerId: string;
    userId: string;
    user: User;
    accessToken: string | null;
    refreshToken: string | null;
    idToken: string | null;
    accessTokenExpiresAt: Date | null;
    refreshTokenExpiresAt: Date | null;
    scope: string | null;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;
}
