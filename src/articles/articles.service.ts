import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { In, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { to } from 'src/utils/utils';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Researcher } from 'src/researchers/researcher.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Researcher)
    private researcherRepository: Repository<Researcher>,
  ) {}

  //Function to get researchers by array of ids
  //why use here - to inject repository not service
  async findResearhcerByIds(ids: number[]) {
    const [err, researchers] = await to(
      this.researcherRepository.find({
        where: {
          id: In(ids),
        },
      }),
    );

    if (err)
      throw new InternalServerErrorException(
        `List of Researchers could not be find due to database server error`,
      );

    return researchers;
  }

  async createAnArticle(createArticleDto: CreateArticleDto) {
    const researchers: Researcher[] = await this.findResearhcerByIds(
      createArticleDto.author_id,
    );

    const [err, resOnSave] = await to(
      this.articleRepository.save({
        ...createArticleDto,
        authors: researchers,
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
    let errOnUpdate;
    let resOnUpdate;

    let article = await this.articleRepository.findOneBy({ id: id });
    if (!article)
      throw new BadRequestException('Article is not present on the database.');

    Object.assign(article, updateArticleDto);

    if (updateArticleDto?.author_id) {
      const researchers: Researcher[] = await this.findResearhcerByIds(
        updateArticleDto.author_id,
      );

      article.authors = researchers;
    }

    [errOnUpdate, resOnUpdate] = await to(this.articleRepository.save(article));

    if (errOnUpdate)
      throw new InternalServerErrorException(errOnUpdate.message);

    return { message: 'Article data edited successfully', data: resOnUpdate };
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
