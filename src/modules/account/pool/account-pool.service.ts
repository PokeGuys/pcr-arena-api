import { Mutex } from 'async-mutex';
import { Injectable, Logger } from '@nestjs/common';
import { PriconneRequestDto } from '@libraries/priconne-client/dtos';
import { Server } from '@libraries/priconne-client/enums';
import { EntityNotFoundException } from '@common/exceptions';
import { Account } from '@modules/account/models/account.entity';
import { buildMutexLockKey } from '@modules/account/utils/lock.util';

@Injectable()
export class AccountPoolService {
  protected readonly logger = new Logger(AccountPoolService.name);

  protected readonly pools: Map<Server, PriconneRequestDto[]> = new Map();

  protected readonly locks: Map<string, Mutex> = new Map();

  public async getByServer(server: Server): Promise<PriconneRequestDto> {
    // Randomly select an account from the pool
    const params = this.pools.get(server);
    if (!params) {
      throw new EntityNotFoundException(Account.name);
    }

    const index = Math.floor(Math.random() * params.length);
    const selectedAccount = params[index];
    const mutex = this.locks.get(buildMutexLockKey(server, selectedAccount.viewerId));
    await mutex!.waitForUnlock();
    return selectedAccount;
  }

  public async acquire(server: Server, viewerId: string) {
    const mutex = this.locks.get(buildMutexLockKey(server, viewerId));
    return mutex!.acquire();
  }

  public add(server: Server, account: Account): void {
    this.logger.log(`Adding account to pool ${server}`);
    const pool = this.pools.get(server);
    const params: PriconneRequestDto = {
      server,
      udid: account.udid,
      shortUdid: account.shortUdid,
      viewerId: account.viewerId,
    };
    this.locks.set(buildMutexLockKey(server, account.viewerId), new Mutex());
    if (!pool) {
      this.pools.set(server, [params]);
    } else {
      pool.push(params);
    }
  }
}
