import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import { AppController } from '@common/app.controller';
import { BootstrapModule } from '@common/bootstrap.module';
import { AccountModule } from '@modules/account/account.module';
import { HealthModule } from '@modules/health';
import { PlayerProfileModule } from '@modules/player-profile/player-profile.module';
import { AllExceptionFilter } from './filters';
import { RequestIdMiddleware } from './middleware';
import { ValidationException } from './exceptions';
import { extractValidateMessage } from './util/exception.util';

@Module({
  imports: [BootstrapModule, HealthModule, AccountModule, PlayerProfileModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          exceptionFactory: (errors) => new ValidationException(extractValidateMessage(errors)),
        }),
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestIdMiddleware).forRoutes({
      path: '(.*)',
      method: RequestMethod.ALL,
    });
  }
}
