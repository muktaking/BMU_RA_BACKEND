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
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
