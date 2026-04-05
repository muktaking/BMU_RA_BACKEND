import { ResearchersService } from './researchers.service';
import { CreateResearcherDto } from './dto/create-researcher.dto';
import { UpdateResearcherDto } from './dto/update-researcher.dto';
export declare class ResearchersController {
    private researchersService;
    constructor(researchersService: ResearchersService);
    getAllResearchers(limit: number): Promise<any>;
    getResearhcerById(id: number): Promise<any>;
    getResearhcersByInstituteId(institute_Id: number): Promise<any>;
    createResearchersByUploadByCSV(res: any, file: Express.Multer.File): Promise<any>;
    createResearcher(createResearcherDto: CreateResearcherDto, req: any): Promise<any>;
    updateResearcherById(id: number, updateResearcherDto: UpdateResearcherDto, req: any): Promise<{
        message: string;
    }>;
    deleteResearcherById(id: number): Promise<{
        message: string;
        data: any;
    }>;
}
