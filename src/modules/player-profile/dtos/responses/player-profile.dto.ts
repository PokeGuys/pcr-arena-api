import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Server } from '@libraries/priconne-client/enums';
import { PlayerArenaDto } from './player-arena.dto';

export class PlayerProfileDto {
  @ApiProperty({
    description: 'The server the player is on',
    enum: Server,
  })
  public readonly server!: Server;

  @ApiProperty({
    description: 'The unique identifier of the player',
  })
  public readonly viewerId!: number;

  @ApiProperty({
    description: 'The name of the player',
  })
  public readonly name!: string;

  @ApiPropertyOptional({
    description: "The name of the player's clan",
  })
  public readonly clanName?: string;

  @ApiProperty({
    description: 'The level of the player',
  })
  public readonly level!: number;

  @ApiProperty({
    description: 'The total power of the player',
  })
  public readonly totalPower!: number;

  @ApiProperty({
    description: 'The last time the player logged in',
  })
  public readonly lastLoginAt!: number;

  @ApiProperty({
    description: 'The unix timestamp of the server',
  })
  public readonly serverTime!: number;

  @ApiProperty({
    description: "The information about the player's arena",
  })
  public readonly arena!: PlayerArenaDto;

  @ApiProperty({
    description: "The information about the player's grand arena",
  })
  public readonly grandArena!: PlayerArenaDto;
}
