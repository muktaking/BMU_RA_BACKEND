import { type MigrationInterface, type QueryRunner, Table, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class AlterUser1776280794443 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('user', new TableColumn({
      name: 'name',
      type: 'text',
      isNullable: false,
    }));

    await queryRunner.addColumn('user', new TableColumn({
      name: 'emailVerified',
      type: 'boolean',
      isNullable: false,
      default: false,
    }));

    await queryRunner.addColumn('user', new TableColumn({
      name: 'image',
      type: 'text',
      isNullable: true,
    }));

    await queryRunner.addColumn('user', new TableColumn({
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'name');
    await queryRunner.dropColumn('user', 'emailVerified');
    await queryRunner.dropColumn('user', 'image');
    await queryRunner.dropColumn('user', 'updatedAt');
    await queryRunner.addColumn('user', new TableColumn({ name: 'avatar', type: 'text', isNullable: true }));
    await queryRunner.addColumn('user', new TableColumn({ name: 'gender', type: 'text', isNullable: true }));
    await queryRunner.addColumn('user', new TableColumn({ name: 'degree', type: 'text', isNullable: true }));
    await queryRunner.addColumn('user', new TableColumn({ name: 'address', type: 'text', isNullable: true }));
    await queryRunner.addColumn('user', new TableColumn({ name: 'password', type: 'text', isNullable: true }));
    await queryRunner.addColumn('user', new TableColumn({ name: 'role', type: 'text', isNullable: true }));
    await queryRunner.addColumn('user', new TableColumn({ name: 'resetToken', type: 'text', isNullable: true }));
    await queryRunner.addColumn('user', new TableColumn({ name: 'resetTokenExpiration', type: 'text', isNullable: true }));
    await queryRunner.addColumn('user', new TableColumn({ name: 'lastname', type: 'text', isNullable: true }));
    await queryRunner.addColumn('user', new TableColumn({ name: 'username', type: 'text', isNullable: true }));
    await queryRunner.addColumn('user', new TableColumn({ name: 'phone', type: 'text', isNullable: true }));
    await queryRunner.addColumn('user', new TableColumn({ name: 'institute', type: 'text', isNullable: true }));
    await queryRunner.addColumn('user', new TableColumn({ name: 'firstname', type: 'text', isNullable: true }));
    await queryRunner.addColumn('user', new TableColumn({ name: 'designation', type: 'text', isNullable: true }));
  }
}