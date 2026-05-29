import { ScalesService } from './scales.service';
import { CreateScaleDto } from './dto/create-scale.dto';
import { UpdateScaleDto } from './dto/update-scale.dto';
export declare class ScalesController {
    private scalesService;
    constructor(scalesService: ScalesService);
    getArticleByid(id: number): Promise<any>;
    getAllScales(limit: number): Promise<any>;
    createScalesByUploadByCSV(res: any, file: Express.Multer.File): Promise<any>;
    createAnScale(createScaleDto: CreateScaleDto, req: any): Promise<{
        message: string;
        data: any;
    }>;
    updateAnScaleById(id: number, updateScaleDto: UpdateScaleDto, req: any): Promise<{
        message: string;
        data: any;
    }>;
    deleteAScaleById(id: number): Promise<{
        message: string;
        data: any;
    }>;
}
