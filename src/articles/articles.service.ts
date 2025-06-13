import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { to } from 'src/utils/utils';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async createAnArticle(createArticleDto: CreateArticleDto) {
    const article = new Article();

    // article.title = createArticleDto.title;
    // article.short_title = createArticleDto.short_title;
    // article.description = createArticleDto.description;
    //article.author = createArticleDto.author?.join(',');
    // article.publication_link = createArticleDto.publication_link;
    //article.tags = createArticleDto.tags?.join(',');

    const [err, resOnSave] = await to(
      this.articleRepository.save({
        ...createArticleDto,
        author: createArticleDto.author?.join(','),
        tags: createArticleDto.tags?.join(','),
      }),
    );

    if (err)
      throw new InternalServerErrorException({
        message: 'Article Data could not be created due to server error.',
        data: err,
      });

    return { message: 'Article is created successfully', data: resOnSave };
  }

  async findAllArticles() {
    const [err, articles] = await to(this.articleRepository.find());

    if (err)
      throw new InternalServerErrorException({
        message: 'Articles Data could not be retrived due to server error.',
        data: err,
      });

    return articles;
  }

  async updateAnArticleById(id: number, updateArticleDto: UpdateArticleDto) {
    const [errOnUpdate, resOnUpdate] = await to(
      this.articleRepository.update(id, {
        ...updateArticleDto,
        author: updateArticleDto.author?.join(','),
        tags: updateArticleDto.tags?.join(','),
      }),
    );

    if (errOnUpdate)
      throw new InternalServerErrorException(errOnUpdate.message);

    if (resOnUpdate.affected > 0) {
      return { message: 'Article data edited successfully' };
    } else
      throw new HttpException(
        'No data is saved. Either no data is sent or no entry is present.',
        HttpStatus.NO_CONTENT,
      );
  }

  async deleteArticleById(id: number) {
    const [errOnDelete, resOnDelete] = await to(
      this.articleRepository.delete(id),
    );

    if (errOnDelete)
      throw new InternalServerErrorException(errOnDelete.message);

    return { message: `Article deleted successfully.`, data: resOnDelete };
  }
}
