"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchersModule = void 0;
const common_1 = require("@nestjs/common");
const researchers_controller_1 = require("./researchers.controller");
const researchers_service_1 = require("./researchers.service");
const typeorm_1 = require("@nestjs/typeorm");
const researcher_entity_1 = require("./researcher.entity");
let ResearchersModule = class ResearchersModule {
};
exports.ResearchersModule = ResearchersModule;
exports.ResearchersModule = ResearchersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([researcher_entity_1.Researcher, researcher_entity_1.SocialProfileResearcher])],
        controllers: [researchers_controller_1.ResearchersController],
        providers: [researchers_service_1.ResearchersService],
        exports: [researchers_service_1.ResearchersService],
    })
], ResearchersModule);
//# sourceMappingURL=researchers.module.js.map