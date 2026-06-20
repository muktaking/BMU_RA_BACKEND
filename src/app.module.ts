import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ResearchersModule } from './researchers/researchers.module';
import { ScalesModule } from './scales/scales.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { DataSource } from 'typeorm';
import { createBetterAuth } from './authentication/auth';

@Module({
  imports: [
    UsersModule,
    ResearchersModule,
    ScalesModule,
    ArticlesModule,
    AuthenticationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 2. Use forRootAsync to wait for variables to load
    TypeOrmModule.forRootAsync({
      // imports: [ConfigModule], <-- You can safely delete this line!
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),

        // This is much safer for production builds 👇
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    // Integrate the native NestJS Better Auth module here
    AuthModule.forRootAsync({
      isGlobal: true,
      inject: [DataSource, ConfigService], // <-- NestJS gathers these instances
      useFactory: (dataSource: DataSource, configService: ConfigService) => {
        const baseURL = configService.get<string>(
          'BETTER_AUTH_URL',
          'http://localhost:3000',
        );
        const secret = configService.get<string>(
          'BETTER_AUTH_SECRET',
          'change-me',
        );
        const client_url = configService.get<string>(
          'BETTER_AUTH_CLIENT_URL',
          'http://localhost:3000',
        );
        // Pass them directly into your separate factory configuration block
        return {
          auth: createBetterAuth({ dataSource, baseURL, secret, client_url }),
        };
      },
    }),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
