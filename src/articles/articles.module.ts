import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Researcher } from 'src/researchers/researcher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Researcher])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
