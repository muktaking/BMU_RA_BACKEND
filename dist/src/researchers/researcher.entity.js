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
exports.SocialProfileResearcher = exports.Researcher = void 0;
const social_profile_entity_1 = require("../users/social-profile.entity");
const user_entity_1 = require("../users/user.entity");
const typeorm_1 = require("typeorm");
let Researcher = class Researcher extends user_entity_1.Profile {
    publication;
    awards;
    int_affiliation;
    editor_in_Journal;
    socialProfiles;
};
exports.Researcher = Researcher;
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Researcher.prototype, "publication", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Researcher.prototype, "awards", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Researcher.prototype, "int_affiliation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Researcher.prototype, "editor_in_Journal", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SocialProfileResearcher, (socialProfile) => socialProfile.researcher, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], Researcher.prototype, "socialProfiles", void 0);
exports.Researcher = Researcher = __decorate([
    (0, typeorm_1.Entity)()
], Researcher);
let SocialProfileResearcher = class SocialProfileResearcher extends social_profile_entity_1.SocialProfileBase {
    researcher;
};
exports.SocialProfileResearcher = SocialProfileResearcher;
__decorate([
    (0, typeorm_1.ManyToOne)(() => Researcher, (researcher) => researcher.socialProfiles),
    __metadata("design:type", Researcher)
], SocialProfileResearcher.prototype, "researcher", void 0);
exports.SocialProfileResearcher = SocialProfileResearcher = __decorate([
    (0, typeorm_1.Entity)()
], SocialProfileResearcher);
//# sourceMappingURL=researcher.entity.js.map