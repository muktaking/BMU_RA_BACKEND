// shared/access.ts
import { createAccessControl } from 'better-auth/plugins/access';

// 1. Define what resources exist and what can be done to them
export const ac = createAccessControl({
  user: ['create', 'list', 'set-role', 'ban', 'delete'],
  session: ['list', 'revoke'],
  // Add your own custom backend resources if needed
  articles: ['create', 'read', 'edit', 'delete'],
  scales: ['create', 'read', 'edit', 'delete'],
  researchers: ['create', 'read', 'edit', 'delete'],
});

// 2. Map out your custom roles using the keys that match your Enum logic
export const roles = {
  admin: ac.newRole({
    user: ['create', 'list', 'set-role', 'ban', 'delete'],
    session: ['list', 'revoke'],
    articles: ['create', 'read', 'edit', 'delete'],
    scales: ['create', 'read', 'edit', 'delete'],
    researchers: ['create', 'read', 'edit', 'delete'],
  }),
  coordinator: ac.newRole({
    user: ['list', 'ban'],
    articles: ['create', 'read', 'edit', 'delete'],
    scales: ['create', 'read', 'edit', 'delete'],
    researchers: ['create', 'read', 'edit', 'delete'],
  }),
  moderator: ac.newRole({
    user: ['list'],
    articles: ['create', 'read', 'edit', 'delete'],
    scales: ['create', 'read', 'edit', 'delete'],
    researchers: ['create', 'read', 'edit', 'delete'],
  }),
  researcher: ac.newRole({
    articles: ['create', 'read', 'edit'],
    scales: ['create', 'read', 'edit'],
    researchers: ['create', 'read', 'edit'],
  }),
  member: ac.newRole({
    articles: ['read'],
    scales: ['read'],
    researchers: ['read'],
  }),
  guest: ac.newRole({
    articles: ['read'],
    scales: ['read'],
    researchers: ['read'],
  }),
};

export type Roles = keyof typeof roles;
