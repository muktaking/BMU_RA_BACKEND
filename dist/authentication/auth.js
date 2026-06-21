"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBetterAuth = void 0;
const better_auth_1 = require("better-auth");
const plugins_1 = require("better-auth/plugins");
const better_auth_typeorm_1 = require("@hedystia/better-auth-typeorm");
const access_1 = require("./access");
const createBetterAuth = ({ dataSource, baseURL, secret, client_url, }) => {
    return (0, better_auth_1.betterAuth)({
        database: (0, better_auth_typeorm_1.typeormAdapter)(dataSource),
        baseURL: baseURL,
        basePath: '/api/auth',
        secret: secret,
        emailAndPassword: {
            enabled: true,
        },
        trustedOrigins: [client_url, 'https://prabd.monerghor.com'],
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
        databaseHooks: {
            user: {
                create: {
                    before: async (user) => {
                        return {
                            data: {
                                ...user,
                                role: user.role === 'user' || !user.role ? 'member' : user.role,
                                image: user.image || 'neutral',
                            },
                        };
                    },
                },
            },
        },
        plugins: [
            {
                id: 'user-signup-modifier',
                hooks: {
                    before: [
                        {
                            matcher: (context) => context.path === '/sign-up/email',
                            handler: async (context) => {
                                if (!context.body) {
                                    return;
                                }
                                const body = context.body;
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
            (0, plugins_1.admin)({ ac: access_1.ac, roles: access_1.roles }),
        ],
    });
};
exports.createBetterAuth = createBetterAuth;
//# sourceMappingURL=auth.js.map