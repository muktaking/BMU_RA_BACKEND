import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { to } from 'src/utils/utils';

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
}
