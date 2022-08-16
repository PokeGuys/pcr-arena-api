import { Migration } from '@mikro-orm/migrations';

export class Migration20220815183821 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "account" alter column "id" drop default;');
    this.addSql('alter table "account" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "account" alter column "udid" drop default;');
    this.addSql('alter table "account" alter column "udid" type uuid using ("udid"::text::uuid);');
    this.addSql(
      'alter table "account" alter column "short_udid" type varchar(255) using ("short_udid"::varchar(255));',
    );
    this.addSql(
      'alter table "account" alter column "viewer_id" type varchar(255) using ("viewer_id"::varchar(255));',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "account" alter column "id" type text using ("id"::text);');
    this.addSql('alter table "account" alter column "udid" type text using ("udid"::text);');

    this.addSql('alter table "account" alter column "id" type bytea using ("id"::bytea);');
    this.addSql('alter table "account" alter column "udid" type bytea using ("udid"::bytea);');
    this.addSql(
      'alter table "account" alter column "short_udid" type int using ("short_udid"::int);',
    );
    this.addSql(
      'alter table "account" alter column "viewer_id" type int using ("viewer_id"::int);',
    );
  }
}
