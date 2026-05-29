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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scale = void 0;
const article_entity_1 = require("../articles/article.entity");
const researcher_entity_1 = require("../researchers/researcher.entity");
const typeorm_1 = require("typeorm");
let Scale = class Scale extends article_entity_1.BasePublication {
    short_title;
    validator_id;
    validator_name;
    validators;
    validation_year;
};
exports.Scale = Scale;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 25, nullable: false }),
    __metadata("design:type", String)
], Scale.prototype, "short_title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: false }),
    __metadata("design:type", Array)
], Scale.prototype, "validator_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: false }),
    __metadata("design:type", Array)
], Scale.prototype, "validator_name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => researcher_entity_1.Researcher),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Scale.prototype, "validators", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        nullable: true,
        transformer: {
            to: (value) => value,
            from: (value) => (value ? value.toDateString() : value),
        },
    }),
    __metadata("design:type", String)
], Scale.prototype, "validation_year", void 0);
exports.Scale = Scale = __decorate([
    (0, typeorm_1.Entity)()
], Scale);
//# sourceMappingURL=scale.entity.js.map