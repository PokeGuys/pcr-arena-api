import { Migration } from '@mikro-orm/migrations';

export class Migration20220815145520 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "account" ("id" bytea not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "server" smallint not null, "udid" bytea not null, "short_udid" int not null, "viewer_id" int not null, constraint "account_pkey" primary key ("id"));',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "account" cascade;');
  }
}
