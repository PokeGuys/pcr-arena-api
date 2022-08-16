import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { DUPLICATE_ENTRY } from '@common/constants/exception.constants';
import { ERROR_CODE_DESCRIPTION } from '@common/constants/swagger.constants';
import { ApiException } from '@common/exceptions/api.exception';

export class SchemaDuplicatedEntryException extends ApiException {
  @ApiProperty({
    description: ERROR_CODE_DESCRIPTION,
    default: DUPLICATE_ENTRY,
  })
  public readonly error!: string;

  constructor(stack?: string) {
    super({ code: DUPLICATE_ENTRY }, HttpStatus.BAD_REQUEST);
    this.stack = stack;
  }
}
