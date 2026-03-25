import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as config from 'config';
import { join } from 'path';

const baseSiteConfig = config.get('base_site');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 1. Enable Cookie Parser
  app.use(cookieParser());

  // Expose the 'uploads' folder publicly under the '/uploads' path
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  // 2. Configure CORS for Next.js
  app.enableCors({
    origin: baseSiteConfig.url, // Your Next.js URL
    credentials: true, // Essential for passing cookies
  });
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
