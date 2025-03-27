import { MigrationInterface, QueryRunner } from "typeorm";

export class RoleRemove1743063516708 implements MigrationInterface {
    name = 'RoleRemove1743063516708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Roles" DROP COLUMN "status"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Roles" ADD "status" boolean NOT NULL`);
    }

}
