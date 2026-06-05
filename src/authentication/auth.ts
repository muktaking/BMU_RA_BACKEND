// src/authentication/auth-instance.ts
import { betterAuth } from 'better-auth';
import { admin } from 'better-auth/plugins';
import { typeormAdapter } from '@hedystia/better-auth-typeorm';
import { DataSource } from 'typeorm';
import { ac, roles } from './access';

interface AuthConfigOptions {
  dataSource: DataSource;
  baseURL: string;
  secret: string; // Better-auth requires a secret key for token signing
  client_url: string;
}

export const createBetterAuth = ({
  dataSource,
  baseURL,
  secret,
  client_url,
}: AuthConfigOptions) => {
  return betterAuth({
    database: typeormAdapter(dataSource as any),
    baseURL: baseURL,
    basePath: '/api/auth',
    secret: secret, // <-- Don't forget to inject this!
    emailAndPassword: {
      enabled: true,
    },
    // You can also map these strings out to env variables if needed
    trustedOrigins: [client_url],
    user: {
      additionalFields: {
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        phone: { type: 'string' },
        degree: { type: 'string' },
        institute: { type: 'number' },
        gender: { type: 'string' },
        address: { type: 'string' },
      },
    },
    // Map or intercept fields globally using hooks
    plugins: [
      {
        id: 'user-signup-modifier',
        hooks: {
          // Change this from a single function to an array of matcher/handler objects
          before: [
            {
              // Matcher targets the specific endpoint
              matcher: (context) => context.path === '/sign-up/email',

              // Handler executes the modification logic
              handler: async (context) => {
                // 1. Guard against an empty body
                if (!context.body) {
                  return; // Pass through if there is no body data
                }

                const body = context.body as Record<string, any>;

                // Apply your custom modifications
                body.image = body.image || 'neutral';

                return {
                  context: {
                    ...context,
                    body,
                  },
                };
              },
            },
          ],
        },
      },
      admin({ ac, roles }),
    ],
  });
};

export type BetterAuthInstance = ReturnType<typeof createBetterAuth>;
