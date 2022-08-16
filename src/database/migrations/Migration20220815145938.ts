import { Migration } from '@mikro-orm/migrations';

export class Migration20220815145938 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "account" add constraint "account_server_udid_short_udid_unique" unique ("server", "udid", "short_udid");',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "account" drop constraint "account_server_udid_short_udid_unique";');
  }
}
