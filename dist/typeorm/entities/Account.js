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
exports.Account = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Account = class Account {
    id;
    accountId;
    providerId;
    userId;
    user;
    accessToken;
    refreshToken;
    idToken;
    accessTokenExpiresAt;
    refreshTokenExpiresAt;
    scope;
    password;
    createdAt;
    updatedAt;
};
exports.Account = Account;
__decorate([
    (0, typeorm_1.PrimaryColumn)('text'),
    __metadata("design:type", String)
], Account.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'accountId' }),
    __metadata("design:type", String)
], Account.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'providerId' }),
    __metadata("design:type", String)
], Account.prototype, "providerId", void 0);
__decorate([
    (0, typeorm_1.Index)('account_userId_idx'),
    (0, typeorm_1.Column)('text', { name: 'userId' }),
    __metadata("design:type", String)
], Account.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { onDelete: 'CASCADE', nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'userId', referencedColumnName: 'id' }),
    __metadata("design:type", User_1.User)
], Account.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'accessToken', nullable: true }),
    __metadata("design:type", Object)
], Account.prototype, "accessToken", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'refreshToken', nullable: true }),
    __metadata("design:type", Object)
], Account.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'idToken', nullable: true }),
    __metadata("design:type", Object)
], Account.prototype, "idToken", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'accessTokenExpiresAt', nullable: true }),
    __metadata("design:type", Object)
], Account.prototype, "accessTokenExpiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'refreshTokenExpiresAt', nullable: true }),
    __metadata("design:type", Object)
], Account.prototype, "refreshTokenExpiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'scope', nullable: true }),
    __metadata("design:type", Object)
], Account.prototype, "scope", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'password', nullable: true }),
    __metadata("design:type", Object)
], Account.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Account.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'updatedAt' }),
    __metadata("design:type", Date)
], Account.prototype, "updatedAt", void 0);
exports.Account = Account = __decorate([
    (0, typeorm_1.Entity)('account')
], Account);
//# sourceMappingURL=Account.js.map