import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '@common/dtos/abstract.dto';
import { Server } from '@libraries/priconne-client/enums';

export class AccountDto extends AbstractDto {
  @ApiProperty({
    description: 'The server the account is for',
    enum: Server,
    example: Server.GourmetEdifice,
  })
  public readonly server!: Server;
}
