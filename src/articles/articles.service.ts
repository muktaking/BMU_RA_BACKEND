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
import * as csv from 'csv-parser';
import * as fs from 'fs';

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
    const article = new Article();

    const researchers: Researcher[] = await this.findResearhcerByIds(
      createArticleDto.author_id,
    );

    Object.assign(article, createArticleDto);
    article.authors = researchers;

    const [err, resOnSave] = await to(this.articleRepository.save(article));

    if (err)
      throw new InternalServerErrorException({
        message: 'Article Data could not be created due to server error.',
        data: err,
      });

    return { message: 'Article is created successfully', data: resOnSave };
  }

  async createArticlesByUploadByCSV(res, file) {
    const results: Array<CreateArticleDto> = [];

    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (data: CreateArticleDto) => results.push(data))
      .on('end', () => {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.log(err);
          }
        });
        Promise.all(
          results.map(async (articlePartialData) => {
            const article = new CreateArticleDto();
            article.title = articlePartialData.title;
            article.description = articlePartialData.title;
            article.author_name = articlePartialData.author_name;
            article.author_id = articlePartialData.author_id;
            article.publisher = articlePartialData.publisher
              ? articlePartialData.publisher
              : '';
            article.doi = articlePartialData.doi ? articlePartialData.doi : '';
            article.publication_link = articlePartialData?.publication_link;
            article.server_link = articlePartialData?.server_link;
            article.tags = articlePartialData?.tags;

            await this.createAnArticle(article);
          }),
        )
          .then((response) => {
            res.json({ message: 'Successfully Uploaded Articles' });
          })
          .catch((error) => {
            console.log(error);
            res.status(HttpStatus.CONFLICT).json({ message: error.message });
          });
      });
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
