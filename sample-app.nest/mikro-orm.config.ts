import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations'; // Добавьте этот импорт

const config: Options = {
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'SampleApp',
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  port: 5432,
  driver: PostgreSqlDriver,
  debug: true,
  extensions: [Migrator], // Добавьте эту строку
  migrations: {
    tableName: 'migrations', // имя таблицы для хранения миграций
    path: './migrations',   // путь к папке с миграциями

    transactional: true,    // выполнять миграции в транзакциях
    disableForeignKeys: true, // временно отключать foreign keys
    allOrNothing: true,     // откатывать все при ошибке
    emit: 'ts',             // генерировать миграции как TypeScript
  },
};

export default config;