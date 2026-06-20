"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = exports.ac = void 0;
const access_1 = require("better-auth/plugins/access");
exports.ac = (0, access_1.createAccessControl)({
    user: ['create', 'list', 'set-role', 'ban', 'delete'],
    session: ['list', 'revoke'],
    articles: ['create', 'read', 'edit', 'delete'],
    scales: ['create', 'read', 'edit', 'delete'],
    researchers: ['create', 'read', 'edit', 'delete'],
});
exports.roles = {
    admin: exports.ac.newRole({
        user: ['create', 'list', 'set-role', 'ban', 'delete'],
        session: ['list', 'revoke'],
        articles: ['create', 'read', 'edit', 'delete'],
        scales: ['create', 'read', 'edit', 'delete'],
        researchers: ['create', 'read', 'edit', 'delete'],
    }),
    coordinator: exports.ac.newRole({
        user: ['list', 'ban'],
        articles: ['create', 'read', 'edit', 'delete'],
        scales: ['create', 'read', 'edit', 'delete'],
        researchers: ['create', 'read', 'edit', 'delete'],
    }),
    moderator: exports.ac.newRole({
        user: ['list'],
        articles: ['create', 'read', 'edit', 'delete'],
        scales: ['create', 'read', 'edit', 'delete'],
        researchers: ['create', 'read', 'edit', 'delete'],
    }),
    researcher: exports.ac.newRole({
        articles: ['create', 'read', 'edit'],
        scales: ['create', 'read', 'edit'],
        researchers: ['create', 'read', 'edit'],
    }),
    member: exports.ac.newRole({
        articles: ['read'],
        scales: ['read'],
        researchers: ['read'],
    }),
    guest: exports.ac.newRole({
        articles: ['read'],
        scales: ['read'],
        researchers: ['read'],
    }),
};
//# sourceMappingURL=access.js.map