import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Get the config service
  const configService = app.get(ConfigService);
  const BETTER_AUTH_CLIENT_URL = configService.get<string>(
    'BETTER_AUTH_CLIENT_URL',
  );
  // Add this check before app.use(...)
  if (!BETTER_AUTH_CLIENT_URL) {
    throw new Error(
      'FATAL: BETTER_AUTH_CLIENT_URL environment variable is missing!',
    );
  }

  app.use(cookieParser());
  // app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/', // Ensure it has a trailing slash
  });

  // CRUCIAL FOR CPANEL: Tells Express to trust proxy routing headers
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
