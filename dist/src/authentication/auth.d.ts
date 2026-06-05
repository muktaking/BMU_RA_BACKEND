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
    user: {
        additionalFields: {
            firstname: {
                type: "string";
            };
            lastname: {
                type: "string";
            };
            phone: {
                type: "string";
            };
            degree: {
                type: "string";
            };
            institute: {
                type: "number";
            };
            gender: {
                type: "string";
            };
            address: {
                type: "string";
            };
        };
    };
    plugins: [{
        id: "user-signup-modifier";
        hooks: {
            before: {
                matcher: (context: import("better-auth").HookEndpointContext) => boolean;
                handler: (context: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    context: {
                        body: Record<string, any>;
                        query?: Record<string, any> | undefined;
                        request?: Request;
                        headers?: HeadersInit;
                        asResponse?: boolean;
                        returnHeaders?: boolean;
                        use?: import("better-auth").Middleware[];
                    };
                } | undefined>;
            }[];
        };
    }];
}>;
export type BetterAuthInstance = ReturnType<typeof createBetterAuth>;
export {};
