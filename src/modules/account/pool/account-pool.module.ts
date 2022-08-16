import { Global, Module } from '@nestjs/common';
import { AccountPoolService } from './account-pool.service';

@Global()
@Module({
  providers: [AccountPoolService],
  exports: [AccountPoolService],
})
export class AccountPoolModule {}
