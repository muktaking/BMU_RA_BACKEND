import { User as UserEntity } from '@/users/user.entity';
export declare class Session {
    id: string;
    userId: string;
    user: UserEntity;
    token: string;
    expiresAt: Date;
    ipAddress?: string;
    userAgent?: string;
    createdAt: string;
    updatedAt: string;
}
