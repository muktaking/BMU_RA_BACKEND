"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScalesService = void 0;
const common_1 = require("@nestjs/common");
const csv = require("csv-parser");
const fs = require("fs");
const typeorm_1 = require("@nestjs/typeorm");
const scale_entity_1 = require("./scale.entity");
const typeorm_2 = require("typeorm");
const create_scale_dto_1 = require("./dto/create-scale.dto");
const utils_1 = require("../utils/utils");
const researcher_entity_1 = require("../researchers/researcher.entity");
let ScalesService = class ScalesService {
    scaleRepository;
    researcherRepository;
    constructor(scaleRepository, researcherRepository) {
        this.scaleRepository = scaleRepository;
        this.researcherRepository = researcherRepository;
    }
    async findResearhcerByIds(ids) {
        const [err, researchers] = await (0, utils_1.to)(this.researcherRepository.find({
            where: {
                id: (0, typeorm_2.In)(ids),
            },
        }));
        if (err)
            throw new common_1.InternalServerErrorException(`List of Researchers could not be find due to database server error`);
        return researchers;
    }
    async createAnScale(createScaleDto, filePath = '') {
        console.log(filePath);
        const scale = new scale_entity_1.Scale();
        const validators = await this.findResearhcerByIds(createScaleDto.validator_id);
        Object.assign(scale, createScaleDto);
        scale.validators = validators;
        scale.server_link = filePath;
        const [err, resOnSave] = await (0, utils_1.to)(this.scaleRepository.save(scale));
        if (err)
            throw new common_1.InternalServerErrorException({
                message: 'Scale Data could not be created due to server error.',
                data: err,
            });
        return { message: 'Scale is created successfully', data: resOnSave };
    }
    async createScalesByUploadByCSV(res, file) {
        const results = [];
        fs.createReadStream(file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            Promise.all(results.map(async (scalePartialData) => {
                const scale = new create_scale_dto_1.CreateScaleDto();
                scale.title = scalePartialData.title;
                scale.short_title = scalePartialData.short_title;
                scale.validator_id = scalePartialData.validator_id;
                scale.validator_name = scalePartialData.validator_name;
                scale.validation_year = scalePartialData.validation_year;
                scale.description = scalePartialData.title;
                scale.publisher = scalePartialData.publisher
                    ? scalePartialData.publisher
                    : '';
                scale.publication_link = scalePartialData?.publication_link;
                scale.server_link = scalePartialData?.server_link;
                scale.tags = scalePartialData?.tags;
                await this.createAnScale(scale);
            }))
                .then((response) => {
                res.json({ message: 'Successfully Uploaded Scales' });
            })
                .catch((error) => {
                console.log(error);
                res.status(common_1.HttpStatus.CONFLICT).json({ message: error.message });
            });
        });
    }
    async findAllScales(limit) {
        const [err, articles] = await (0, utils_1.to)(this.scaleRepository.find({ take: limit, order: { id: 'DESC' } }));
        if (err)
            throw new common_1.InternalServerErrorException({
                message: 'Scales Data could not be retrived due to server error.',
                data: err,
            });
        return articles;
    }
    async findArticleById(id) {
        const [err, scale] = await (0, utils_1.to)(this.scaleRepository.findOneBy({ id: id }));
        if (err)
            throw new common_1.InternalServerErrorException({
                message: 'Articles Data could not be retrived due to server error.',
                data: err,
            });
        if (!scale)
            throw new common_1.BadRequestException('Scale is not present on the database.');
        return scale;
    }
    async updateAScaleById(id, updateScaleDto, filePath = '') {
        let errOnUpdate;
        let resOnUpdate;
        let scale = await this.scaleRepository.findOneBy({ id: id });
        if (!scale)
            throw new common_1.BadRequestException('Article is not present on the database.');
        Object.assign(scale, updateScaleDto);
        if (filePath !== '') {
            scale.server_link = filePath;
        }
        if (updateScaleDto?.validator_id) {
            const researchers = await this.findResearhcerByIds(updateScaleDto.validator_id);
            scale.validators = researchers;
        }
        [errOnUpdate, resOnUpdate] = await (0, utils_1.to)(this.scaleRepository.save(scale));
        if (errOnUpdate)
            throw new common_1.InternalServerErrorException(errOnUpdate.message);
        return { message: 'Article data edited successfully', data: resOnUpdate };
    }
    async deleteAScaleById(id) {
        const [errOnDelete, resOnDelete] = await (0, utils_1.to)(this.scaleRepository.delete(id));
        if (errOnDelete)
            throw new common_1.InternalServerErrorException(errOnDelete.message);
        return { message: `Scale deleted successfully.`, data: resOnDelete };
    }
};
exports.ScalesService = ScalesService;
exports.ScalesService = ScalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(scale_entity_1.Scale)),
    __param(1, (0, typeorm_1.InjectRepository)(researcher_entity_1.Researcher)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ScalesService);
//# sourceMappingURL=scales.service.js.map