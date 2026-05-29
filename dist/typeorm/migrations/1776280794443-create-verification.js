"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVerification1776280794443 = void 0;
const typeorm_1 = require("typeorm");
class CreateVerification1776280794443 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'verification',
            columns: [
                {
                    name: 'id',
                    type: 'text',
                    isPrimary: true,
                },
                {
                    name: 'identifier',
                    type: 'text',
                },
                {
                    name: 'value',
                    type: 'text',
                },
                {
                    name: 'expiresAt',
                    type: 'datetime',
                },
                {
                    name: 'createdAt',
                    type: 'datetime',
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: 'updatedAt',
                    type: 'datetime',
                    default: "CURRENT_TIMESTAMP",
                }
            ],
        }));
        await queryRunner.createIndex('verification', new typeorm_1.TableIndex({
            name: 'verification_identifier_idx',
            columnNames: ['identifier'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('verification');
    }
}
exports.CreateVerification1776280794443 = CreateVerification1776280794443;
//# sourceMappingURL=1776280794443-create-verification.js.map