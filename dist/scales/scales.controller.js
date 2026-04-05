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
exports.ScalesController = void 0;
const common_1 = require("@nestjs/common");
const scales_service_1 = require("./scales.service");
const create_scale_dto_1 = require("./dto/create-scale.dto");
const update_scale_dto_1 = require("./dto/update-scale.dto");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../roles.guard");
const roles_decorator_1 = require("../roles.decorator");
const user_entity_1 = require("../users/user.entity");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const files_uploading_utils_1 = require("../utils/files-uploading.utils");
let ScalesController = class ScalesController {
    scalesService;
    constructor(scalesService) {
        this.scalesService = scalesService;
    }
    async getArticleByid(id) {
        return await this.scalesService.findArticleById(id);
    }
    async getAllScales(limit) {
        return await this.scalesService.findAllScales(limit);
    }
    async createScalesByUploadByCSV(res, file) {
        return await this.scalesService.createScalesByUploadByCSV(res, file);
    }
    async createAnScale(createScaleDto, req) {
        return await this.scalesService.createAnScale(createScaleDto, req.file.path);
    }
    async updateAnScaleById(id, updateScaleDto, req) {
        return await this.scalesService.updateAScaleById(id, updateScaleDto, req.file.path);
    }
    async deleteAScaleById(id) {
        return await this.scalesService.deleteAScaleById(id);
    }
};
exports.ScalesController = ScalesController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ScalesController.prototype, "getArticleByid", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('limit', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ScalesController.prototype, "getAllScales", null);
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
], ScalesController.prototype, "createScalesByUploadByCSV", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Role)(user_entity_1.RolePermitted.researcher),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('pdf_file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/scales',
            filename: files_uploading_utils_1.editFileName,
        }),
        fileFilter: files_uploading_utils_1.pdfFileFilter,
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_scale_dto_1.CreateScaleDto, Object]),
    __metadata("design:returntype", Promise)
], ScalesController.prototype, "createAnScale", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Role)(user_entity_1.RolePermitted.researcher),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('pdf_file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/scales',
            filename: files_uploading_utils_1.editFileName,
        }),
        fileFilter: files_uploading_utils_1.pdfFileFilter,
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_scale_dto_1.UpdateScaleDto, Object]),
    __metadata("design:returntype", Promise)
], ScalesController.prototype, "updateAnScaleById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Role)(user_entity_1.RolePermitted.researcher),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ScalesController.prototype, "deleteAScaleById", null);
exports.ScalesController = ScalesController = __decorate([
    (0, common_1.Controller)('scales'),
    __metadata("design:paramtypes", [scales_service_1.ScalesService])
], ScalesController);
//# sourceMappingURL=scales.controller.js.map