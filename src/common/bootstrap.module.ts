import path from 'path';
import {
  I18nModule,
  QueryResolver,
  HeaderResolver,
  AcceptLanguageResolver,
  CookieResolver,
  I18nJsonLoader,
} from 'nestjs-i18n';
import { LoggerModule } from 'nestjs-pino';
import { stdSerializers } from 'pino';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from '@config/env.validator';
import { BaseConfig } from '@config/interfaces';
import { appConfig, httpConfig } from '@config/loader';
import {
  requestIdGenerator,
  customLogLevelFormatter,
  requestSerializer,
  responseSerializer,
} from '@common/util/logger.util';
import { PriconneModule } from '@libraries/priconne-client/priconne.module';
import { Language } from './enums';
import { AccountPoolModule } from '../modules/account/pool';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      cache: true,
      load: [appConfig, httpConfig],
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    MikroOrmModule.forRoot(),
    I18nModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          fallbackLanguage: config.get<string>('app.fallbackLanguage', Language.English),
          loaderOptions: {
            path: path.join(__dirname, '/i18n/'),
          },
        };
      },
      loader: I18nJsonLoader,
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale', 'l'] },
        new HeaderResolver(['x-locale']),
        AcceptLanguageResolver,
        new CookieResolver(['lang', 'locale', 'l']),
      ],
      inject: [ConfigService],
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<BaseConfig, true>) => {
        const { enabled, level, redact } = config.get('app.logger', { infer: true });
        return {
          pinoHttp: {
            enabled,
            level,
            redact,
            autoLogging: true,
            genReqId: requestIdGenerator,
            customLogLevel: customLogLevelFormatter,
            serializers: {
              err: stdSerializers.err,
              req: requestSerializer,
              res: responseSerializer,
            },
          },
          exclude: [{ method: RequestMethod.ALL, path: '(.*)/(readiness|liveness)' }],
        };
      },
    }),
    PriconneModule.forRoot(),
    AccountPoolModule,
  ],
})
export class BootstrapModule {}
