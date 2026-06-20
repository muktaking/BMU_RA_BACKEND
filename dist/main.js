"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = require("path");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const BETTER_AUTH_CLIENT_URL = configService.get('BETTER_AUTH_CLIENT_URL', 'https://prabd.monerghor.com');
    console.log(configService.get('BETTER_AUTH_CLIENT_URL'));
    if (!BETTER_AUTH_CLIENT_URL) {
        throw new Error('FATAL: BETTER_AUTH_CLIENT_URL environment variable is missing!');
    }
    app.use((0, cookie_parser_1.default)());
    app.useStaticAssets((0, path_1.join)(process.cwd(), 'uploads'), {
        prefix: '/uploads/',
    });
    app.getHttpAdapter().getInstance().set('trust proxy', 1);
    app.enableCors({
        origin: [BETTER_AUTH_CLIENT_URL],
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Accept, Authorization',
    });
    await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
//# sourceMappingURL=main.js.map