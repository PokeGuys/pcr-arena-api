import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from '@modules/health/health.controller';
import { MikroOrmHealthIndicator } from '@modules/health/indicators';

@Module({
  imports: [TerminusModule, MikroOrmModule],
  controllers: [HealthController],
  providers: [MikroOrmHealthIndicator],
})
export class HealthModule {}
