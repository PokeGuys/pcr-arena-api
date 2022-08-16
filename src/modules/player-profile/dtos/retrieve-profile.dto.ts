import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
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
  public readonly server!: Server;

  @IsInt()
  @IsNotEmpty()
  @IsValidPlayerId()
  @ApiProperty({
    description: 'The unique identifier of the player',
    example: 123456789,
  })
  public readonly id!: number;
}
