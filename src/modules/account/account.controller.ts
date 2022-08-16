import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddAccountDto } from './dtos';
import { AccountService } from './account.service';

@ApiTags('Account')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOperation({
    summary: 'Add an account',
    description: 'Add an account to the account pool',
  })
  @ApiCreatedResponse({
    description: 'The account has been added to the pool',
  })
  public async add(@Body() dto: AddAccountDto): Promise<void> {
    await this.accountService.create(dto);
  }
}
