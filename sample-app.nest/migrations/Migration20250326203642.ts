import { Migration } from '@mikro-orm/migrations';

export class Migration20250326203642 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "post" drop constraint "post_author_id_foreign";`);

    this.addSql(`create table "Users" ("id" serial primary key, "name" varchar(255) not null, "age" int not null, "test" varchar(255) not null);`);

    this.addSql(`create table "Posts" ("id" serial primary key, "title" varchar(255) not null, "content" varchar(255) not null, "author_id" int not null);`);

    this.addSql(`alter table "Posts" add constraint "Posts_author_id_foreign" foreign key ("author_id") references "Users" ("id") on update cascade;`);

    this.addSql(`drop table if exists "post" cascade;`);

    this.addSql(`drop table if exists "user" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "Posts" drop constraint "Posts_author_id_foreign";`);

    this.addSql(`create table "post" ("id" serial primary key, "title" varchar(255) not null, "content" varchar(255) not null, "author_id" int4 not null);`);

    this.addSql(`create table "user" ("id" serial primary key, "name" varchar(255) not null, "age" int4 not null, "test" varchar(255) not null);`);

    this.addSql(`alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade on delete no action;`);

    this.addSql(`drop table if exists "Users" cascade;`);

    this.addSql(`drop table if exists "Posts" cascade;`);
  }

}
