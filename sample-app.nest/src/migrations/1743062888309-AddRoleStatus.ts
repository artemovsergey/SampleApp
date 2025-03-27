import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleStatus1743062888309 implements MigrationInterface {
    name = 'AddRoleStatus1743062888309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Roles" ADD "status" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Roles" DROP COLUMN "status"`);
    }

}
