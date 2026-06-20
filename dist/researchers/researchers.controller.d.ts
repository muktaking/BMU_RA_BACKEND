import { ResearchersService } from './researchers.service';
import { CreateResearcherDto } from './dto/create-researcher.dto';
import { UpdateResearcherDto } from './dto/update-researcher.dto';
export declare class ResearchersController {
    private researchersService;
    constructor(researchersService: ResearchersService);
    getAllResearchers(limit: number): Promise<import("./researcher.entity").Researcher[]>;
    getResearhcerById(id: string): Promise<import("./researcher.entity").Researcher | null>;
    getResearhcersByInstituteId(institute_Id: number): Promise<import("./researcher.entity").Researcher[]>;
    createResearchersByUploadByCSV(res: any, file: Express.Multer.File): Promise<any>;
    createResearcher(createResearcherDto: CreateResearcherDto, req: any): Promise<import("./researcher.entity").Researcher>;
    updateResearcherById(id: string, updateResearcherDto: UpdateResearcherDto, req: any): Promise<{
        message: string;
    }>;
    deleteResearcherById(id: number): Promise<{
        message: string;
        data: import("typeorm").DeleteResult;
    }>;
}
