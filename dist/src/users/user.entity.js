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
exports.User = exports.Profile = exports.Institute = exports.Gender = exports.LoginProvider = exports.RolePermitted = void 0;
const typeorm_1 = require("typeorm");
const social_profile_entity_1 = require("./social-profile.entity");
const Session_entity_1 = require("../authentication/Session.entity");
const Account_entity_1 = require("../authentication/Account.entity");
var RolePermitted;
(function (RolePermitted) {
    RolePermitted[RolePermitted["guest"] = 0] = "guest";
    RolePermitted[RolePermitted["member"] = 1] = "member";
    RolePermitted[RolePermitted["researcher"] = 2] = "researcher";
    RolePermitted[RolePermitted["moderator"] = 3] = "moderator";
    RolePermitted[RolePermitted["coordinator"] = 4] = "coordinator";
    RolePermitted[RolePermitted["admin"] = 5] = "admin";
})(RolePermitted || (exports.RolePermitted = RolePermitted = {}));
var LoginProvider;
(function (LoginProvider) {
    LoginProvider[LoginProvider["local"] = 0] = "local";
    LoginProvider[LoginProvider["facebook"] = 1] = "facebook";
    LoginProvider[LoginProvider["google"] = 2] = "google";
})(LoginProvider || (exports.LoginProvider = LoginProvider = {}));
var Gender;
(function (Gender) {
    Gender["male"] = "male";
    Gender["female"] = "female";
})(Gender || (exports.Gender = Gender = {}));
var Institute;
(function (Institute) {
    Institute[Institute["bmu"] = 1] = "bmu";
    Institute[Institute["nimh"] = 2] = "nimh";
    Institute[Institute["somch"] = 3] = "somch";
    Institute[Institute["afmc"] = 4] = "afmc";
    Institute[Institute["foreign"] = 6] = "foreign";
    Institute[Institute["local"] = 7] = "local";
})(Institute || (exports.Institute = Institute = {}));
class Profile extends typeorm_1.BaseEntity {
    id;
    firstname;
    lastname;
    name;
    image;
    email;
    emailVerified;
    gender;
    phone;
    degree;
    designation;
    institute;
    address;
    createdAt;
    updatedAt;
}
exports.Profile = Profile;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Profile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], Profile.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15, nullable: false }),
    __metadata("design:type", String)
], Profile.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Profile.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Profile.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true, nullable: false }),
    __metadata("design:type", String)
], Profile.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 0 }),
    __metadata("design:type", Boolean)
], Profile.prototype, "emailVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Gender }),
    __metadata("design:type", String)
], Profile.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "degree", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "designation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Institute }),
    __metadata("design:type", Number)
], Profile.prototype, "institute", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeorm_1.Timestamp)
], Profile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeorm_1.Timestamp)
], Profile.prototype, "updatedAt", void 0);
let User = class User extends Profile {
    role;
    sessions;
    accounts;
    socialProfiles;
};
exports.User = User;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'member' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => social_profile_entity_1.SocialProfile, (socialProfile) => socialProfile.user, {
        cascade: true,
        eager: true,
    }),
    (0, typeorm_1.OneToMany)(() => Session_entity_1.Session, (session) => session.user),
    __metadata("design:type", Array)
], User.prototype, "sessions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Account_entity_1.Account, (account) => account.user),
    __metadata("design:type", Array)
], User.prototype, "accounts", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map