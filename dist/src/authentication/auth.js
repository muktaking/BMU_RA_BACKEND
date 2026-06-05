"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBetterAuth = void 0;
const better_auth_1 = require("better-auth");
const better_auth_typeorm_1 = require("@hedystia/better-auth-typeorm");
const createBetterAuth = ({ dataSource, baseURL, secret, client_url, }) => {
    return (0, better_auth_1.betterAuth)({
        database: (0, better_auth_typeorm_1.typeormAdapter)(dataSource),
        baseURL: baseURL,
        basePath: '/api/auth',
        secret: secret,
        emailAndPassword: {
            enabled: true,
        },
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
        ],
    });
};
exports.createBetterAuth = createBetterAuth;
//# sourceMappingURL=auth.js.map