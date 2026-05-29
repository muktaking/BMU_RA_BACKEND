"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSession1776280794443 = void 0;
const typeorm_1 = require("typeorm");
class CreateSession1776280794443 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'session',
            columns: [
                {
                    name: 'id',
                    type: 'text',
                    isPrimary: true,
                },
                {
                    name: 'expiresAt',
                    type: 'datetime',
                },
                {
                    name: 'token',
                    type: 'text',
                    isUnique: true,
                },
                {
                    name: 'createdAt',
                    type: 'datetime',
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: 'updatedAt',
                    type: 'datetime',
                },
                {
                    name: 'ipAddress',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'userAgent',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'userId',
                    type: 'text',
                }
            ],
        }));
        await queryRunner.createIndex('session', new typeorm_1.TableIndex({
            name: 'session_userId_idx',
            columnNames: ['userId'],
        }));
        await queryRunner.createForeignKey('session', new typeorm_1.TableForeignKey({
            columnNames: ['userId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('session');
    }
}
exports.CreateSession1776280794443 = CreateSession1776280794443;
//# sourceMappingURL=1776280794443-create-session.js.map