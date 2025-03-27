import { MigrationInterface, QueryRunner } from "typeorm";

export class InitRole1743062320236 implements MigrationInterface {
    name = 'InitRole1743062320236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Roles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" character varying NOT NULL, CONSTRAINT "PK_efba48c6a0c7a9b6260f771b165" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Roles"`);
    }

}
