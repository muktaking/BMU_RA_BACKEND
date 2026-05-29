// src/auth.ts
import { betterAuth } from 'better-auth';
import { typeormAdapter } from '@hedystia/better-auth-typeorm';
import { DataSource } from 'typeorm';

// 1. Setup your MySQL Data Source
export const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'muktaking',
  password: '22222',
  database: 'bmu',
  entities: [], // Add your custom entities here later
  synchronize: true, // For development only
});

// 2. Initialize Better Auth with the TypeORM adapter
export const auth = betterAuth({
  database: typeormAdapter(dataSource),
  // 1. Add the base URL of this NestJS server
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:5000',

  // 2. Trust your Next.js frontend to make cross-origin requests
  trustedOrigins: ['http://localhost:3000'],
  emailAndPassword: {
    enabled: true,
  },
  // Add other Better Auth plugins (like OAuth, JWT) here
});
