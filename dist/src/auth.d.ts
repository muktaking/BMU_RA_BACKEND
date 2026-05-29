import { DataSource } from 'typeorm';
export declare const dataSource: DataSource;
export declare const auth: import("better-auth").Auth<{
    database: import("better-auth/adapters").AdapterFactory<import("better-auth").BetterAuthOptions>;
    baseURL: string;
    trustedOrigins: string[];
    emailAndPassword: {
        enabled: true;
    };
}>;
