import { Scale } from './scale.entity';
import { Repository } from 'typeorm';
import { CreateScaleDto } from './dto/create-scale.dto';
import { UpdateScaleDto } from './dto/update-scale.dto';
import { Researcher } from 'src/researchers/researcher.entity';
export declare class ScalesService {
    private scaleRepository;
    private researcherRepository;
    constructor(scaleRepository: Repository<Scale>, researcherRepository: Repository<Researcher>);
    findResearhcerByIds(ids: number[]): Promise<any>;
    createAnScale(createScaleDto: CreateScaleDto, filePath?: string): Promise<{
        message: string;
        data: any;
    }>;
    createScalesByUploadByCSV(res: any, file: any): Promise<void>;
    findAllScales(limit: number): Promise<any>;
    findArticleById(id: number): Promise<any>;
    updateAScaleById(id: number, updateScaleDto: UpdateScaleDto, filePath?: string): Promise<{
        message: string;
        data: any;
    }>;
    deleteAScaleById(id: number): Promise<{
        message: string;
        data: any;
    }>;
}
