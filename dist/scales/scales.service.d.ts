import { Scale } from './scale.entity';
import { Repository } from 'typeorm';
import { CreateScaleDto } from './dto/create-scale.dto';
import { UpdateScaleDto } from './dto/update-scale.dto';
import { Researcher } from '@/researchers/researcher.entity';
export declare class ScalesService {
    private scaleRepository;
    private researcherRepository;
    constructor(scaleRepository: Repository<Scale>, researcherRepository: Repository<Researcher>);
    findResearhcerByIds(ids: number[]): Promise<Researcher[]>;
    createAnScale(createScaleDto: CreateScaleDto, filePath?: string): Promise<{
        message: string;
        data: Scale;
    }>;
    createScalesByUploadByCSV(res: any, file: any): Promise<void>;
    findAllScales(limit: number): Promise<Scale[]>;
    findArticleById(id: number): Promise<Scale>;
    updateAScaleById(id: number, updateScaleDto: UpdateScaleDto, filePath?: string): Promise<{
        message: string;
        data: any;
    }>;
    deleteAScaleById(id: number): Promise<{
        message: string;
        data: import("typeorm").DeleteResult;
    }>;
}
