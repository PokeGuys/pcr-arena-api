import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckResult, HealthCheckService } from '@nestjs/terminus';
import { MikroOrmHealthIndicator } from './indicators';
import { HEALTH_MIKROORM_KEY } from './health.constants';
import {
  HEALTH_CHECK_OPERATION_DESCRIPTION,
  HEALTH_CHECK_OPERATION_SUMMARY,
} from './swagger.constants';

@Controller('health')
@ApiTags('Health Check')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly dbIndicator: MikroOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({
    summary: HEALTH_CHECK_OPERATION_SUMMARY,
    description: HEALTH_CHECK_OPERATION_DESCRIPTION,
  })
  public async check(): Promise<HealthCheckResult> {
    return this.health.check([() => this.dbIndicator.pingCheck(HEALTH_MIKROORM_KEY)]);
  }
}
