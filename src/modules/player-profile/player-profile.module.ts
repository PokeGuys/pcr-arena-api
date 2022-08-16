import { Module } from '@nestjs/common';
import { PlayerProfileController } from './player-profile.controller';
import { PlayerProfileService } from './player-profile.service';

@Module({
  controllers: [PlayerProfileController],
  providers: [PlayerProfileService],
  exports: [PlayerProfileService],
})
export class PlayerProfileModule {}
