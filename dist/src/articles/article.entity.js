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
exports.Article = exports.Publication = exports.BasePublication = void 0;
const researcher_entity_1 = require("../researchers/researcher.entity");
const typeorm_1 = require("typeorm");
class BasePublication extends typeorm_1.BaseEntity {
    id;
    title;
    description;
    publication_link;
    server_link;
    published_year;
    publisher;
    tags;
}
exports.BasePublication = BasePublication;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BasePublication.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], BasePublication.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], BasePublication.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1024, nullable: true }),
    __metadata("design:type", String)
], BasePublication.prototype, "publication_link", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], BasePublication.prototype, "server_link", void 0);
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
], BasePublication.prototype, "published_year", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], BasePublication.prototype, "publisher", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], BasePublication.prototype, "tags", void 0);
class Publication extends BasePublication {
    author_id;
    author_name;
    authors;
}
exports.Publication = Publication;
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: false }),
    __metadata("design:type", Array)
], Publication.prototype, "author_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: false }),
    __metadata("design:type", Array)
], Publication.prototype, "author_name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => researcher_entity_1.Researcher),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Publication.prototype, "authors", void 0);
let Article = class Article extends Publication {
    doi;
    generateDOI() {
        if (!this.doi || this.doi.trim() === '') {
            this.doi = `10.${Date.now()}/${Math.random().toString(36).substring(2, 9)}`;
        }
    }
};
exports.Article = Article;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false, unique: true }),
    __metadata("design:type", String)
], Article.prototype, "doi", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Article.prototype, "generateDOI", null);
exports.Article = Article = __decorate([
    (0, typeorm_1.Entity)()
], Article);
//# sourceMappingURL=article.entity.js.map