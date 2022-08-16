import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { BaseConfig } from '@config/interfaces';
import { AppModule } from '@common/app.module';
import { APP_CONFIG_NAMESPACE } from '@common/constants/config.constants';

export const setupApplication = async (): Promise<INestApplication> => {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    bufferLogs: true,
  });

  const cfg = app.get<ConfigService<BaseConfig, true>>(ConfigService);
  const { prefix, corsOptions, versioningOptions } = cfg.get(APP_CONFIG_NAMESPACE, { infer: true });

  // Setup API prefix
  if (prefix) {
    app.setGlobalPrefix(prefix);
  }

  // Enable CORS
  app.enableCors(corsOptions);

  // Setup API versioning
  app.enableVersioning(versioningOptions);

  // Setup shutdown hook
  app.enableShutdownHooks();

  return app;
};
