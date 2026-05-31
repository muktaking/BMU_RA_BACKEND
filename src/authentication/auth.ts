// src/authentication/auth-instance.ts
import { betterAuth } from 'better-auth';
import { typeormAdapter } from '@hedystia/better-auth-typeorm';
import { DataSource } from 'typeorm';

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
  });
};

export type BetterAuthInstance = ReturnType<typeof createBetterAuth>;
