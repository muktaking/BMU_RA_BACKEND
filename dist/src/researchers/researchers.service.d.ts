import { Repository } from 'typeorm';
import { Researcher } from './researcher.entity';
import { CreateResearcherDto } from './dto/create-researcher.dto';
import { UpdateResearcherDto } from './dto/update-researcher.dto';
export declare class ResearchersService {
    private researcherRepository;
    constructor(researcherRepository: Repository<Researcher>);
    findAllResearchersWithLimit(limit: number): Promise<any>;
    findResearhcerById(id: number): Promise<any>;
    findResearhcerByInstituteId(institute_id: number): Promise<any>;
    findResearhcerByIds(ids: number[]): Promise<any>;
    createResearcher(createResearcherDto: CreateResearcherDto, filePath?: string): Promise<any>;
    createResearchersByUploadByCSV(res: any, file: any): Promise<void>;
    updateResearcherById(id: number, updateResearcherDto: UpdateResearcherDto, filePath: string): Promise<{
        message: string;
    }>;
    deleteResearcherById(id: number): Promise<{
        message: string;
        data: any;
    }>;
}
