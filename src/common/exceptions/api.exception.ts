/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  ERROR_CODE_DESCRIPTION,
  ERROR_MESSAGE_DESCRIPTION,
} from '@common/constants/swagger.constants';

export type ExceptionData = {
  code: string;
  payload?: Record<string, any>;
};

export abstract class ApiException extends HttpException {
  @ApiProperty({ description: ERROR_MESSAGE_DESCRIPTION })
  public readonly errorMessage!: string;

  @ApiProperty({ description: ERROR_CODE_DESCRIPTION })
  public readonly error!: string;

  constructor(
    public readonly data: ExceptionData,
    public readonly statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(HttpException.createBody(ApiException.name, data.code, statusCode), statusCode);
  }
}
