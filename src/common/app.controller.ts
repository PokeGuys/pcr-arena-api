import { GetAppVersionApiResponse } from '@common/dtos/responses';
import { BaseConfig } from '@config/interfaces';
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Application')
export class AppController {
  constructor(private configService: ConfigService<BaseConfig, true>) {}

  @Get('version')
  @ApiOperation({
    summary: 'Get App Version',
    description: 'Retrieve the application version with commit hash and build number',
  })
  @ApiOkResponse({
    description: 'The app version info',
    type: GetAppVersionApiResponse,
  })
  public getVersion(): GetAppVersionApiResponse {
    const { commit, build } = this.configService.get('app.version', { infer: true });
    return {
      commit,
      build,
    };
  }
}
