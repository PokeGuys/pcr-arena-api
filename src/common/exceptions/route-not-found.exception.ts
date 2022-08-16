import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ROUTE_NOT_FOUND } from '@common/constants/exception.constants';
import { ERROR_CODE_DESCRIPTION } from '@common/constants/swagger.constants';
import { ApiException } from '@common/exceptions/api.exception';

export class RouteNotFoundException extends ApiException {
  @ApiProperty({
    description: ERROR_CODE_DESCRIPTION,
    default: ROUTE_NOT_FOUND,
  })
  public readonly error!: string;

  constructor() {
    super({ code: ROUTE_NOT_FOUND }, HttpStatus.NOT_FOUND);
  }
}
