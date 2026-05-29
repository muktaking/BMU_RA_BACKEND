import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Researcher } from 'src/researchers/researcher.entity';
export declare class ArticlesService {
    private articleRepository;
    private researcherRepository;
    constructor(articleRepository: Repository<Article>, researcherRepository: Repository<Researcher>);
    findResearhcerByIds(ids: number[]): Promise<any>;
    createAnArticle(createArticleDto: CreateArticleDto): Promise<{
        message: string;
        data: any;
    }>;
    createArticlesByUploadByCSV(res: any, file: any): Promise<void>;
    findAllArticles(limit: number): Promise<any>;
    findArticleById(id: number): Promise<any>;
    findAllArticlesByResearcherId(id: number): Promise<Article[]>;
    updateAnArticleById(id: number, updateArticleDto: UpdateArticleDto): Promise<{
        message: string;
        data: any;
    }>;
    deleteArticleById(id: number): Promise<{
        message: string;
        data: any;
    }>;
}
