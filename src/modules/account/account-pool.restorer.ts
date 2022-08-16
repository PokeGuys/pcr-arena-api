import pThrottle from 'p-throttle';
import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PriconneClient } from '@libraries/priconne-client/priconne.client';
import { AccountService } from './account.service';
import { AccountPoolService } from './pool/account-pool.service';
import { Account } from './models/account.entity';

@Injectable()
export class AccountPoolRestorer implements OnModuleInit {
  private readonly logger = new Logger(AccountPoolRestorer.name);

  constructor(
    protected readonly orm: MikroORM,
    protected readonly accountService: AccountService,
    protected readonly pool: AccountPoolService,
    protected readonly priconneClient: PriconneClient,
  ) {}

  @UseRequestContext()
  public async onModuleInit(): Promise<void> {
    this.logger.log('Restoring accounts from database');
    const accounts = await this.accountService.findAll();
    const throttler = pThrottle({ limit: 1, interval: 1000 });
    const throttledRestore = throttler(this.restore.bind(this));
    await Promise.all(accounts.map((account) => throttledRestore(account)));
    this.logger.log(`Restored ${accounts.length} accounts`);
  }

  private async restore(account: Account): Promise<void> {
    await this.priconneClient.authenticate(account);
    this.pool.add(account.server, account);
  }
}
