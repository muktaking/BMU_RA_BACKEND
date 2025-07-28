import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ResearchersModule } from './researchers/researchers.module';
import { ScalesModule } from './scales/scales.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeormconfig/typeorm.config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    UsersModule,
    ResearchersModule,
    ScalesModule,
    ArticlesModule,
    AuthenticationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
