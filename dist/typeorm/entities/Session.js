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
exports.Session = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Session = class Session {
    id;
    expiresAt;
    token;
    createdAt;
    updatedAt;
    ipAddress;
    userAgent;
    userId;
    user;
};
exports.Session = Session;
__decorate([
    (0, typeorm_1.PrimaryColumn)('text'),
    __metadata("design:type", String)
], Session.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'expiresAt' }),
    __metadata("design:type", Date)
], Session.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'token', unique: true }),
    __metadata("design:type", String)
], Session.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Session.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'updatedAt' }),
    __metadata("design:type", Date)
], Session.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'ipAddress', nullable: true }),
    __metadata("design:type", Object)
], Session.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'userAgent', nullable: true }),
    __metadata("design:type", Object)
], Session.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Index)('session_userId_idx'),
    (0, typeorm_1.Column)('text', { name: 'userId' }),
    __metadata("design:type", String)
], Session.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { onDelete: 'CASCADE', nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'userId', referencedColumnName: 'id' }),
    __metadata("design:type", User_1.User)
], Session.prototype, "user", void 0);
exports.Session = Session = __decorate([
    (0, typeorm_1.Entity)('session')
], Session);
//# sourceMappingURL=Session.js.map