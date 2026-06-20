import { Repository } from 'typeorm';
import { Researcher } from './researcher.entity';
import { CreateResearcherDto } from './dto/create-researcher.dto';
import { UpdateResearcherDto } from './dto/update-researcher.dto';
export declare class ResearchersService {
    private researcherRepository;
    constructor(researcherRepository: Repository<Researcher>);
    findAllResearchersWithLimit(limit: number): Promise<Researcher[]>;
    findResearhcerById(id: string): Promise<Researcher | null>;
    findResearhcerByInstituteId(institute_id: number): Promise<Researcher[]>;
    findResearhcerByIds(ids: number[]): Promise<Researcher[]>;
    createResearcher(createResearcherDto: CreateResearcherDto, filePath?: string): Promise<Researcher>;
    createResearchersByUploadByCSV(res: any, file: any): Promise<void>;
    updateResearcherById(id: string, updateResearcherDto: UpdateResearcherDto, filePath: string): Promise<{
        message: string;
    }>;
    deleteResearcherById(id: number): Promise<{
        message: string;
        data: import("typeorm").DeleteResult;
    }>;
}
