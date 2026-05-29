"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.dataSource = void 0;
const better_auth_1 = require("better-auth");
const better_auth_typeorm_1 = require("@hedystia/better-auth-typeorm");
const typeorm_1 = require("typeorm");
exports.dataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'muktaking',
    password: '22222',
    database: 'bmu',
    entities: [],
    synchronize: true,
});
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, better_auth_typeorm_1.typeormAdapter)(exports.dataSource),
    baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:5000',
    trustedOrigins: ['http://localhost:3000'],
    emailAndPassword: {
        enabled: true,
    },
});
//# sourceMappingURL=auth.js.map