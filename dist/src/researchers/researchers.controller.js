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
exports.ResearchersController = void 0;
const common_1 = require("@nestjs/common");
const researchers_service_1 = require("./researchers.service");
const create_researcher_dto_1 = require("./dto/create-researcher.dto");
const update_researcher_dto_1 = require("./dto/update-researcher.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const files_uploading_utils_1 = require("../utils/files-uploading.utils");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../roles.guard");
const roles_decorator_1 = require("../roles.decorator");
const user_entity_1 = require("../users/user.entity");
let ResearchersController = class ResearchersController {
    researchersService;
    constructor(researchersService) {
        this.researchersService = researchersService;
    }
    async getAllResearchers(limit) {
        return await this.researchersService.findAllResearchersWithLimit(limit);
    }
    async getResearhcerById(id) {
        return await this.researchersService.findResearhcerById(id);
    }
    async getResearhcersByInstituteId(institute_Id) {
        return await this.researchersService.findResearhcerByInstituteId(institute_Id);
    }
    async createResearchersByUploadByCSV(res, file) {
        return await this.researchersService.createResearchersByUploadByCSV(res, file);
    }
    async createResearcher(createResearcherDto, req) {
        return await this.researchersService.createResearcher(createResearcherDto, req.file.path);
    }
    async updateResearcherById(id, updateResearcherDto, req) {
        return await this.researchersService.updateResearcherById(id, updateResearcherDto, req.file?.path);
    }
    async deleteResearcherById(id) {
        return await this.researchersService.deleteResearcherById(id);
    }
};
exports.ResearchersController = ResearchersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('limit', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResearchersController.prototype, "getAllResearchers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResearchersController.prototype, "getResearhcerById", null);
__decorate([
    (0, common_1.Get)('/institute/:institute_id'),
    __param(0, (0, common_1.Param)('institute_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResearchersController.prototype, "getResearhcersByInstituteId", null);
__decorate([
    (0, common_1.Post)('/upload/csv'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Role)(user_entity_1.RolePermitted.moderator),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/files',
            filename: files_uploading_utils_1.editFileName,
        }),
        fileFilter: files_uploading_utils_1.csvFileFilter,
    })),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ResearchersController.prototype, "createResearchersByUploadByCSV", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Role)(user_entity_1.RolePermitted.moderator),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/avatars',
            filename: files_uploading_utils_1.editFileName,
        }),
        fileFilter: files_uploading_utils_1.imageFileFilter,
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_researcher_dto_1.CreateResearcherDto, Object]),
    __metadata("design:returntype", Promise)
], ResearchersController.prototype, "createResearcher", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Role)(user_entity_1.RolePermitted.moderator),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/avatars',
            filename: files_uploading_utils_1.editFileName,
        }),
        fileFilter: files_uploading_utils_1.imageFileFilter,
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_researcher_dto_1.UpdateResearcherDto, Object]),
    __metadata("design:returntype", Promise)
], ResearchersController.prototype, "updateResearcherById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Role)(user_entity_1.RolePermitted.coordinator),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResearchersController.prototype, "deleteResearcherById", null);
exports.ResearchersController = ResearchersController = __decorate([
    (0, common_1.Controller)('researchers'),
    __metadata("design:paramtypes", [researchers_service_1.ResearchersService])
], ResearchersController);
//# sourceMappingURL=researchers.controller.js.map