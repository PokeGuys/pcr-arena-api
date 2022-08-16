import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { UNAUTHORIZED_ACCESS } from '@common/constants/exception.constants';
import { ERROR_CODE_DESCRIPTION } from '@common/constants/swagger.constants';
import { ApiException } from '@common/exceptions/api.exception';

export class UnauthorizedAccessException extends ApiException {
  @ApiProperty({
    description: ERROR_CODE_DESCRIPTION,
    default: UNAUTHORIZED_ACCESS,
  })
  public readonly error!: string;

  constructor() {
    super({ code: UNAUTHORIZED_ACCESS }, HttpStatus.UNAUTHORIZED);
  }
}
