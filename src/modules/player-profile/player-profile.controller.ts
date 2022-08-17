import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from '@common/guards';
import { PlayerProfileDto, RetrieveProfileDto } from './dtos';
import { PlayerProfileService } from './player-profile.service';

@ApiTags('Player')
@Controller('players')
@UseGuards(ApiKeyGuard)
export class PlayerProfileController {
  constructor(private readonly playerService: PlayerProfileService) {}

  @Get()
  @ApiOperation({
    summary: 'Get player profile',
    description: 'Retrieve a player profile in the given server',
  })
  @ApiOkResponse({
    description: 'Player profile',
    type: PlayerProfileDto,
  })
  public async retrieve(@Query() dto: RetrieveProfileDto): Promise<PlayerProfileDto> {
    return this.playerService.retrieve(dto);
  }
}
