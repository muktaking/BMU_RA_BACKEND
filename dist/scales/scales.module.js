"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScalesModule = void 0;
const common_1 = require("@nestjs/common");
const scales_controller_1 = require("./scales.controller");
const scales_service_1 = require("./scales.service");
const typeorm_1 = require("@nestjs/typeorm");
const scale_entity_1 = require("./scale.entity");
const researcher_entity_1 = require("../researchers/researcher.entity");
let ScalesModule = class ScalesModule {
};
exports.ScalesModule = ScalesModule;
exports.ScalesModule = ScalesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([scale_entity_1.Scale, researcher_entity_1.Researcher])],
        controllers: [scales_controller_1.ScalesController],
        providers: [scales_service_1.ScalesService],
    })
], ScalesModule);
//# sourceMappingURL=scales.module.js.map