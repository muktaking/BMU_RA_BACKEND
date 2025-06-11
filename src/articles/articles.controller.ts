import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  // @Get()
  // async getAllArticles() {
  //   return await this.articleService.findAllArticles();
  // }

  // @Get('author/:id')
  // async getAllArticlesByAuthorId(@Param('id', ParseIntPipe) id: number) {
  //   return await this.articleService.findAllArticlesByAuthorId(id);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  async createAnArticle(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.createAnArticle(createArticleDto);
  }
}
