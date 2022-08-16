import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Server } from '@libraries/priconne-client/enums';

export class AddAccountDto {
  @ApiProperty({
    description: 'The server the account is for',
    enum: Server,
    example: Server.GourmetEdifice,
  })
  @IsEnum(Server)
  public readonly server!: Server;

  @ApiProperty({
    description: 'The unique identifier of the user',
  })
  @IsString()
  @IsNotEmpty()
  public readonly udid!: string;

  @ApiProperty({
    description: 'The short form of unique identifier of the user',
  })
  @IsString()
  @IsNotEmpty()
  public readonly shortUdid!: string;

  @ApiProperty({
    description: 'The viewer identifier of the user',
  })
  @IsString()
  @IsNotEmpty()
  public readonly viewerId!: string;
}
