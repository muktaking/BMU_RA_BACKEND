import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Researcher } from '@/researchers/researcher.entity';
export declare class ArticlesService {
    private articleRepository;
    private researcherRepository;
    constructor(articleRepository: Repository<Article>, researcherRepository: Repository<Researcher>);
    findResearhcerByIds(ids: number[]): Promise<Researcher[]>;
    createAnArticle(createArticleDto: CreateArticleDto): Promise<{
        message: string;
        data: Article;
    }>;
    createArticlesByUploadByCSV(res: any, file: any): Promise<void>;
    findAllArticles(limit: number): Promise<Article[]>;
    findArticleById(id: number): Promise<Article>;
    findAllArticlesByResearcherId(id: number): Promise<Article[]>;
    updateAnArticleById(id: number, updateArticleDto: UpdateArticleDto): Promise<{
        message: string;
        data: any;
    }>;
    deleteArticleById(id: number): Promise<{
        message: string;
        data: import("typeorm").DeleteResult;
    }>;
}
