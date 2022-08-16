import { Injectable, Logger } from '@nestjs/common';
import { PriconneClient } from '@libraries/priconne-client/priconne.client';
import { AccountPoolService } from '@modules/account/pool';
import { RetrieveProfileDto, PlayerProfileDto } from './dtos';

@Injectable()
export class PlayerProfileService {
  private readonly logger = new Logger(PlayerProfileService.name);

  constructor(
    protected readonly pool: AccountPoolService,
    private readonly priconneClient: PriconneClient,
  ) {}

  public async retrieve(dto: RetrieveProfileDto): Promise<PlayerProfileDto> {
    this.logger.log(`Retrieving profile ${dto.id} from server ${dto.server}`);
    const account = await this.pool.getByServer(dto.server);
    // Lock the account so that other requests can't use it
    this.logger.log(`Acquiring lock for account ${account.viewerId} (server ${account.server})`);
    const releaser = await this.pool.acquire(account.server, account.viewerId);
    const { data: profile, data_headers: headers } = await this.priconneClient.getProfile(
      dto.id,
      account,
    );
    this.logger.log(`Releasing lock for account ${account.viewerId} (server ${account.server})`);
    releaser();
    this.logger.debug(profile, `Retrieved profile ${dto.id} from server ${dto.server}`);
    return {
      viewerId: dto.id,
      server: dto.server,
      name: profile.user_info.user_name,
      clanName: profile.clan_name || undefined,
      level: profile.user_info.team_level,
      totalPower: profile.user_info.total_power,
      lastLoginAt: profile.last_login_at,
      serverTime: headers.servertime,
      arena: {
        group: profile.user_info.arena_group,
        rank: profile.user_info.arena_rank,
        createdAt: profile.user_info.arena_time,
      },
      grandArena: {
        group: profile.user_info.grand_arena_group,
        rank: profile.user_info.grand_arena_rank,
        createdAt: profile.user_info.grand_arena_time,
      },
    };
  }
}
