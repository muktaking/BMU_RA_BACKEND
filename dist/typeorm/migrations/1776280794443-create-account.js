"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccount1776280794443 = void 0;
const typeorm_1 = require("typeorm");
class CreateAccount1776280794443 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'account',
            columns: [
                {
                    name: 'id',
                    type: 'text',
                    isPrimary: true,
                },
                {
                    name: 'accountId',
                    type: 'text',
                },
                {
                    name: 'providerId',
                    type: 'text',
                },
                {
                    name: 'userId',
                    type: 'text',
                },
                {
                    name: 'accessToken',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'refreshToken',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'idToken',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'accessTokenExpiresAt',
                    type: 'datetime',
                    isNullable: true,
                },
                {
                    name: 'refreshTokenExpiresAt',
                    type: 'datetime',
                    isNullable: true,
                },
                {
                    name: 'scope',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'password',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'createdAt',
                    type: 'datetime',
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: 'updatedAt',
                    type: 'datetime',
                }
            ],
        }));
        await queryRunner.createIndex('account', new typeorm_1.TableIndex({
            name: 'account_userId_idx',
            columnNames: ['userId'],
        }));
        await queryRunner.createForeignKey('account', new typeorm_1.TableForeignKey({
            columnNames: ['userId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('account');
    }
}
exports.CreateAccount1776280794443 = CreateAccount1776280794443;
//# sourceMappingURL=1776280794443-create-account.js.map