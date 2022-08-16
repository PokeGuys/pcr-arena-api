import { ApiProperty } from '@nestjs/swagger';

export class PlayerArenaDto {
  @ApiProperty({
    description: "The group of the player's arena",
  })
  public readonly group!: number;

  @ApiProperty({
    description: "The rank of the player's arena",
  })
  public readonly rank!: number;

  @ApiProperty({
    description: "The time the player's arena was created",
  })
  public readonly createdAt!: number;
}
