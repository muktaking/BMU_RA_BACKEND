import { ScalesService } from './scales.service';
import { CreateScaleDto } from './dto/create-scale.dto';
import { UpdateScaleDto } from './dto/update-scale.dto';
export declare class ScalesController {
    private scalesService;
    constructor(scalesService: ScalesService);
    getArticleByid(id: number): Promise<import("./scale.entity").Scale>;
    getAllScales(limit: number): Promise<import("./scale.entity").Scale[]>;
    createScalesByUploadByCSV(res: any, file: Express.Multer.File): Promise<any>;
    createAnScale(createScaleDto: CreateScaleDto, req: any): Promise<{
        message: string;
        data: import("./scale.entity").Scale;
    }>;
    updateAnScaleById(id: number, updateScaleDto: UpdateScaleDto, req: any): Promise<{
        message: string;
        data: any;
    }>;
    deleteAScaleById(id: number): Promise<{
        message: string;
        data: import("typeorm").DeleteResult;
    }>;
}
