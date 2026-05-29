"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterUser1776280794443 = void 0;
const typeorm_1 = require("typeorm");
class AlterUser1776280794443 {
    async up(queryRunner) {
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({
            name: 'name',
            type: 'text',
            isNullable: false,
        }));
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({
            name: 'emailVerified',
            type: 'boolean',
            isNullable: false,
            default: false,
        }));
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({
            name: 'image',
            type: 'text',
            isNullable: true,
        }));
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({
            name: 'updatedAt',
            type: 'datetime',
            isNullable: false,
            default: "CURRENT_TIMESTAMP",
        }));
        await queryRunner.dropColumn('user', 'avatar');
        await queryRunner.dropColumn('user', 'gender');
        await queryRunner.dropColumn('user', 'degree');
        await queryRunner.dropColumn('user', 'address');
        await queryRunner.dropColumn('user', 'password');
        await queryRunner.dropColumn('user', 'role');
        await queryRunner.dropColumn('user', 'resetToken');
        await queryRunner.dropColumn('user', 'resetTokenExpiration');
        await queryRunner.dropColumn('user', 'lastname');
        await queryRunner.dropColumn('user', 'username');
        await queryRunner.dropColumn('user', 'phone');
        await queryRunner.dropColumn('user', 'institute');
        await queryRunner.dropColumn('user', 'firstname');
        await queryRunner.dropColumn('user', 'designation');
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('user', 'name');
        await queryRunner.dropColumn('user', 'emailVerified');
        await queryRunner.dropColumn('user', 'image');
        await queryRunner.dropColumn('user', 'updatedAt');
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({ name: 'avatar', type: 'text', isNullable: true }));
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({ name: 'gender', type: 'text', isNullable: true }));
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({ name: 'degree', type: 'text', isNullable: true }));
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({ name: 'address', type: 'text', isNullable: true }));
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({ name: 'password', type: 'text', isNullable: true }));
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({ name: 'role', type: 'text', isNullable: true }));
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({ name: 'resetToken', type: 'text', isNullable: true }));
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({ name: 'resetTokenExpiration', type: 'text', isNullable: true }));
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({ name: 'lastname', type: 'text', isNullable: true }));
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({ name: 'username', type: 'text', isNullable: true }));
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({ name: 'phone', type: 'text', isNullable: true }));
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({ name: 'institute', type: 'text', isNullable: true }));
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({ name: 'firstname', type: 'text', isNullable: true }));
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({ name: 'designation', type: 'text', isNullable: true }));
    }
}
exports.AlterUser1776280794443 = AlterUser1776280794443;
//# sourceMappingURL=1776280794443-alter-user.js.map