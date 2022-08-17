import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Server } from '@libraries/priconne-client/enums';
import { IsValidPlayerId } from '@modules/player-profile/validations';

export class RetrieveProfileDto {
  @IsEnum(Server)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The server the account is for',
    enum: Server,
    example: Server.GourmetEdifice,
  })
  @Type(() => Number)
  public readonly server!: Server;

  @IsInt()
  @IsNotEmpty()
  @IsValidPlayerId()
  @ApiProperty({
    description: 'The unique identifier of the player',
    example: 123456789,
  })
  @Type(() => Number)
  public readonly id!: number;
}
