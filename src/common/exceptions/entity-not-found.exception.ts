import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ENTITY_NOT_FOUND } from '@common/constants/exception.constants';
import { ERROR_CODE_DESCRIPTION } from '@common/constants/swagger.constants';
import { ApiException } from '@common/exceptions/api.exception';

export class EntityNotFoundException extends ApiException {
  @ApiProperty({
    description: ERROR_CODE_DESCRIPTION,
    default: ENTITY_NOT_FOUND,
  })
  public readonly error!: string;

  constructor(entity: string) {
    super({ code: ENTITY_NOT_FOUND, payload: { entity } }, HttpStatus.NOT_FOUND);
  }
}
