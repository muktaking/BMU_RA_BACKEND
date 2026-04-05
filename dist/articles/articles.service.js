"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const article_entity_1 = require("./article.entity");
const typeorm_2 = require("typeorm");
const create_article_dto_1 = require("./dto/create-article.dto");
const utils_1 = require("../utils/utils");
const researcher_entity_1 = require("../researchers/researcher.entity");
const csv = require("csv-parser");
const fs = require("fs");
let ArticlesService = class ArticlesService {
    articleRepository;
    researcherRepository;
    constructor(articleRepository, researcherRepository) {
        this.articleRepository = articleRepository;
        this.researcherRepository = researcherRepository;
    }
    async findResearhcerByIds(ids) {
        const [err, researchers] = await (0, utils_1.to)(this.researcherRepository.find({
            where: {
                id: (0, typeorm_2.In)(ids),
            },
        }));
        if (err)
            throw new common_1.InternalServerErrorException(`List of Researchers could not be find due to database server error`);
        return researchers;
    }
    async createAnArticle(createArticleDto) {
        const article = new article_entity_1.Article();
        const researchers = await this.findResearhcerByIds(createArticleDto.author_id);
        Object.assign(article, createArticleDto);
        article.authors = researchers;
        const [err, resOnSave] = await (0, utils_1.to)(this.articleRepository.save(article));
        if (err) {
            console.log(err);
            throw new common_1.InternalServerErrorException({
                message: 'Article Data could not be created due to server error.',
                data: err,
            });
        }
        return { message: 'Article is created successfully', data: resOnSave };
    }
    async createArticlesByUploadByCSV(res, file) {
        const results = [];
        fs.createReadStream(file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            Promise.all(results.map(async (articlePartialData) => {
                const article = new create_article_dto_1.CreateArticleDto();
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
            }))
                .then((response) => {
                res.json({ message: 'Successfully Uploaded Articles' });
            })
                .catch((error) => {
                console.log(error);
                res.status(common_1.HttpStatus.CONFLICT).json({ message: error.message });
            });
        });
    }
    async findAllArticles(limit) {
        const [err, articles] = await (0, utils_1.to)(this.articleRepository.find({ take: limit, order: { id: 'DESC' } }));
        if (err)
            throw new common_1.InternalServerErrorException({
                message: 'Articles Data could not be retrived due to server error.',
                data: err,
            });
        return articles;
    }
    async findArticleById(id) {
        const [err, article] = await (0, utils_1.to)(this.articleRepository.findOneBy({ id: id }));
        if (err)
            throw new common_1.InternalServerErrorException({
                message: 'Articles Data could not be retrived due to server error.',
                data: err,
            });
        if (!article)
            throw new common_1.BadRequestException('Article is not present on the database.');
        return article;
    }
    async findAllArticlesByResearcherId(id) {
        const idString = id.toString();
        return await this.articleRepository
            .createQueryBuilder('article')
            .where('article.author_id = :exact', { exact: idString })
            .orWhere('article.author_id LIKE :start', { start: `${idString},%` })
            .orWhere('article.author_id LIKE :middle', { middle: `%,${idString},%` })
            .orWhere('article.author_id LIKE :end', { end: `%,${idString}` })
            .orderBy('article.id', 'DESC')
            .take(10)
            .getMany();
    }
    async updateAnArticleById(id, updateArticleDto) {
        let errOnUpdate;
        let resOnUpdate;
        let article = await this.articleRepository.findOneBy({ id: id });
        if (!article)
            throw new common_1.BadRequestException('Article is not present on the database.');
        Object.assign(article, updateArticleDto);
        if (updateArticleDto?.author_id) {
            const researchers = await this.findResearhcerByIds(updateArticleDto.author_id);
            article.authors = researchers;
        }
        [errOnUpdate, resOnUpdate] = await (0, utils_1.to)(this.articleRepository.save(article));
        if (errOnUpdate)
            throw new common_1.InternalServerErrorException(errOnUpdate.message);
        return { message: 'Article data edited successfully', data: resOnUpdate };
    }
    async deleteArticleById(id) {
        const [errOnDelete, resOnDelete] = await (0, utils_1.to)(this.articleRepository.delete(id));
        if (errOnDelete)
            throw new common_1.InternalServerErrorException(errOnDelete.message);
        return { message: `Article deleted successfully.`, data: resOnDelete };
    }
};
exports.ArticlesService = ArticlesService;
exports.ArticlesService = ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(article_entity_1.Article)),
    __param(1, (0, typeorm_1.InjectRepository)(researcher_entity_1.Researcher)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ArticlesService);
//# sourceMappingURL=articles.service.js.map