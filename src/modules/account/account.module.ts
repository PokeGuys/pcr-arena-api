import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Account } from './models/account.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountPoolRestorer } from './account-pool.restorer';

@Module({
  imports: [MikroOrmModule.forFeature([Account])],
  controllers: [AccountController],
  providers: [AccountService, AccountPoolRestorer],
  exports: [AccountService],
})
export class AccountModule {}
