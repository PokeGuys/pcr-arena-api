import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { INTERNAL_SERVER_ERROR } from '@common/constants/exception.constants';
import { ERROR_CODE_DESCRIPTION } from '@common/constants/swagger.constants';
import { ApiException } from '@common/exceptions/api.exception';

export class InternalServerException extends ApiException {
  @ApiProperty({
    description: ERROR_CODE_DESCRIPTION,
    default: INTERNAL_SERVER_ERROR,
  })
  public readonly error!: string;

  constructor(stack?: string) {
    super({ code: INTERNAL_SERVER_ERROR }, HttpStatus.INTERNAL_SERVER_ERROR);
    this.stack = stack;
  }
}
