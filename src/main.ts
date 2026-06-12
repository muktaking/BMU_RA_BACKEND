import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Get the config service
  const configService = app.get(ConfigService);
  const BETTER_AUTH_CLIENT_URL = configService.get<string>(
    'BETTER_AUTH_CLIENT_URL',
    'http://localhost:3000',
  );

  app.use(cookieParser());
  // app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/', // Ensure it has a trailing slash
  });

  app.enableCors({
    origin: [BETTER_AUTH_CLIENT_URL],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
