import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlayerProfileDto, RetrieveProfileDto } from './dtos';
import { PlayerProfileService } from './player-profile.service';

@ApiTags('Player')
@Controller('players')
export class PlayerProfileController {
  constructor(private readonly playerService: PlayerProfileService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Search player',
    description: 'Search for a specific player in the given server',
  })
  @ApiOkResponse({
    description: 'Player profile',
    type: PlayerProfileDto,
  })
  public async retrieve(@Body() dto: RetrieveProfileDto): Promise<PlayerProfileDto> {
    return this.playerService.retrieve(dto);
  }
}
