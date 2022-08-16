import { FastifyReply } from 'fastify';
import { I18nService } from 'nestjs-i18n';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiException,
  InternalServerException,
  RouteNotFoundException,
  SchemaDuplicatedEntryException,
  UnauthorizedAccessException,
  ValidationException,
} from '@common/exceptions';
import { EXCEPTION_HANDLER_NAME } from '@common/constants/exception.constants';
import { UniqueConstraintViolationException } from '@mikro-orm/core';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(EXCEPTION_HANDLER_NAME);

  constructor(private readonly i18n: I18nService) {}

  public async catch(exception: HttpException | ApiException | Error, host: ArgumentsHost) {
    try {
      if (exception instanceof NotFoundException) {
        throw new RouteNotFoundException();
      }
      if (exception instanceof UnauthorizedException) {
        throw new UnauthorizedAccessException();
      }
      if (exception instanceof UniqueConstraintViolationException) {
        throw new SchemaDuplicatedEntryException(exception.stack);
      }
      if (!(exception instanceof HttpException)) {
        throw new InternalServerException(exception.stack);
      }
    } catch (e) {
      return this.handleApiError(e as ApiException, host);
    }
    if (exception instanceof ApiException) {
      return this.handleApiError(exception, host);
    }

    return this.handleHttpError(exception, host);
  }

  public async handleApiError(exception: ApiException | ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = <FastifyReply>ctx.getResponse();
    const statusCode = exception.getStatus();
    const { code: errorCode, payload: errorPayload } = exception.data;
    const translatedMessage = await this.i18n.translate(`errors.${errorCode}`, {
      args: errorPayload,
    });
    const errorMessage = translatedMessage || exception.message;
    const isValidationException = exception instanceof ValidationException;
    if (!isValidationException) {
      this.logger.error({
        message: errorMessage,
        name: exception.name,
        stack: exception.stack,
      });
    }
    return response.status(statusCode).send({
      errorMessage,
      error: errorCode,
      ...(isValidationException && { details: exception.details }),
    });
  }

  public handleHttpError(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = <FastifyReply>ctx.getResponse();
    const statusCode = exception.getStatus();
    const payload = exception.getResponse() as Record<string, unknown>;
    this.logger.error({
      statusCode,
      name: exception.name,
      message: exception.message,
      stack: exception.stack,
    });
    return response.status(exception.getStatus()).send({ ...payload });
  }
}
