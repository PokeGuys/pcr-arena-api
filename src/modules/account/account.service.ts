import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { AddAccountDto } from './dtos';
import { Account } from './models/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private readonly accountRepository: EntityRepository<Account>,
  ) {}

  public async create(dto: AddAccountDto): Promise<Account> {
    const account = new Account();
    account.server = dto.server;
    account.udid = dto.udid;
    account.shortUdid = dto.shortUdid;
    account.viewerId = dto.viewerId;
    await this.accountRepository.persistAndFlush(account);

    return account;
  }

  public async findAll(): Promise<Account[]> {
    return this.accountRepository.findAll();
  }
}
