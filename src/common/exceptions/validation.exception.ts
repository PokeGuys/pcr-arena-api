import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { VALIDATION_ERROR } from '@common/constants/exception.constants';
import {
  ERROR_CODE_DESCRIPTION,
  VALIDATION_ERROR_DETAILS_DESCRIPTION,
  VALIDATION_ERROR_DETAILS_EXAMPLE,
} from '@common/constants/swagger.constants';
import { ApiException } from '@common/exceptions/api.exception';

export class ValidationException extends ApiException {
  @ApiProperty({
    description: VALIDATION_ERROR_DETAILS_DESCRIPTION,
    example: VALIDATION_ERROR_DETAILS_EXAMPLE,
  })
  public readonly details: Array<string>;

  @ApiProperty({
    description: ERROR_CODE_DESCRIPTION,
    default: VALIDATION_ERROR,
  })
  public readonly error!: string;

  constructor(errors: Array<string>) {
    super({ code: VALIDATION_ERROR }, HttpStatus.UNPROCESSABLE_ENTITY);
    this.details = errors;
  }
}
