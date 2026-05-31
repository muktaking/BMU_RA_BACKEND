import { betterAuth } from 'better-auth';

export const auth = betterAuth({
  database: {
    provider: 'mysql',
    url: process.env.DATABASE_URL, // e.g., mysql://user:pass@localhost:3306/db_name
  },
  emailAndPassword: {
    enabled: true, // Enables basic email/password auth
  },
  // Simple Authorization: assign roles property to users
  advanced: {
    useRoleInSession: true,
  },
  trustedOrigins: [process.env.FRONTEND_URL], // e.g., http://localhost:3000
});
