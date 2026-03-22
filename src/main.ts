import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as config from 'config';

const baseSiteConfig = config.get('base_site');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 1. Enable Cookie Parser
  app.use(cookieParser());

  // 2. Configure CORS for Next.js
  app.enableCors({
    origin: baseSiteConfig.url, // Your Next.js URL
    credentials: true, // Essential for passing cookies
  });
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
