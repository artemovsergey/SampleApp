import "reflect-metadata"
import { DataSource } from "typeorm"
import Role from "./models/role.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "SampleApp",
    synchronize: true,
    logging: false,
    entities: [Role],
    migrations: ["src/migrations/*.ts"],  // <- откуда загружать миграции
    migrationsTableName: "migrations",
})
