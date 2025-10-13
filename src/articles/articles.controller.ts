import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { csvFileFilter, editFileName } from 'src/utils/files-uploading.utils';

@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Get()
  async getAllArticles(@Query('limit', ParseIntPipe) limit: number) {
    return await this.articleService.findAllArticles(limit);
  }

  @Get(':id')
  async getArticleByid(@Param('id', ParseIntPipe) id: number) {
    return await this.articleService.findArticleById(id);
  }

  // @Get('author/:id')
  // async getAllArticlesByAuthorId(@Param('id', ParseIntPipe) id: number) {
  //   return await this.articleService.findAllArticlesByAuthorId(id);
  // }

  @Post('/upload/csv')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/files',
        filename: editFileName,
      }),
      fileFilter: csvFileFilter,
    }),
  )
  async createArticlesByUploadByCSV(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    return await this.articleService.createArticlesByUploadByCSV(res, file);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createAnArticle(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.createAnArticle(createArticleDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateAnArticleById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return await this.articleService.updateAnArticleById(id, updateArticleDto);
  }

  @Delete(':id')
  async deleteAnArticleById(@Param('id', ParseIntPipe) id: number) {
    return await this.articleService.deleteArticleById(id);
  }
}
