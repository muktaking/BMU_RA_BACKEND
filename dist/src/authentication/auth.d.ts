import { DataSource } from 'typeorm';
interface AuthConfigOptions {
    dataSource: DataSource;
    baseURL: string;
    secret: string;
    client_url: string;
}
export declare const createBetterAuth: ({ dataSource, baseURL, secret, client_url, }: AuthConfigOptions) => import("better-auth").Auth<{
    database: import("better-auth/adapters").AdapterFactory<import("better-auth").BetterAuthOptions>;
    baseURL: string;
    basePath: string;
    secret: string;
    emailAndPassword: {
        enabled: true;
    };
    trustedOrigins: string[];
}>;
export type BetterAuthInstance = ReturnType<typeof createBetterAuth>;
export {};
