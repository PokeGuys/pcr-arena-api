import { ApiProperty } from '@nestjs/swagger';
import {
  APP_VERSION_BUILD_VERSION_DESCRIPTION,
  APP_VERSION_BUILD_VERSION_EXAMPLE,
  APP_VERSION_COMMIT_DESCRIPTION,
  APP_VERSION_COMMIT_EXAMPLE,
} from '@common/constants/swagger.constants';

export class GetAppVersionApiResponse {
  @ApiProperty({
    description: APP_VERSION_COMMIT_DESCRIPTION,
    example: APP_VERSION_COMMIT_EXAMPLE,
  })
  public readonly commit!: string;

  @ApiProperty({
    description: APP_VERSION_BUILD_VERSION_DESCRIPTION,
    example: APP_VERSION_BUILD_VERSION_EXAMPLE,
  })
  public readonly build!: string;
}
