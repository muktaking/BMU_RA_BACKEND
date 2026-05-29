import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
export declare class ArticlesController {
    private articleService;
    constructor(articleService: ArticlesService);
    getAllArticles(limit: number): Promise<any>;
    getArticleByid(id: number): Promise<any>;
    getAllArticlesByResearcherId(id: number): Promise<import("./article.entity").Article[]>;
    createArticlesByUploadByCSV(res: any, file: Express.Multer.File): Promise<any>;
    createAnArticle(createArticleDto: CreateArticleDto): Promise<{
        message: string;
        data: any;
    }>;
    updateAnArticleById(id: number, updateArticleDto: UpdateArticleDto): Promise<{
        message: string;
        data: any;
    }>;
    deleteAnArticleById(id: number): Promise<{
        message: string;
        data: any;
    }>;
}
