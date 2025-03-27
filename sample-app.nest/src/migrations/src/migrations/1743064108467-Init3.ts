import { MigrationInterface, QueryRunner } from "typeorm";

export class Init31743064108467 implements MigrationInterface {
    name = 'Init31743064108467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Roles" DROP COLUMN "status"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Roles" ADD "status" boolean NOT NULL`);
    }

}
