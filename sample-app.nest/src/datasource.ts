import { DataSource } from "typeorm";

export default new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "SampleApp",
    entities: [/*..*/],
    migrations: [/*...*/]
})