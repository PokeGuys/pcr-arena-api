import * as fs from 'fs';
import * as path from 'path';
import { Logger, VersioningType } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import {
  DEFAULT_VERSION,
  UNKNOWN,
  URI_VERSIONING_PREFIX,
  APP_CONFIG_NAMESPACE,
} from '@common/constants';
import type { VersionInfo } from '@common/dtos';
import { AppEnvironment, Language } from '@common/enums';
import type { AppConfig } from '@config/interfaces';

const getVersion = (): VersionInfo | undefined => {
  const configPath = path.join(__dirname, '../../../VERSION.json');
  if (fs.existsSync(configPath)) {
    try {
      const data = fs.readFileSync(configPath, 'utf8');
      return <VersionInfo>JSON.parse(data);
    } catch (error) {
      Logger.error('VERSION.json file does not exist / invalid');
    }
  }

  return undefined;
};

export const appConfig = registerAs(APP_CONFIG_NAMESPACE, (): AppConfig => {
  const versionInfo = getVersion();
  const debug = !!process.env.DEBUG;
  return {
    debug,
    fallbackLanguage: process.env.FALLBACK_LANGUAGE || Language.English,
    prefix: process.env.APP_PREFIX,
    env: process.env.APP_ENV || AppEnvironment.Production,
    host: process.env.APP_HOST,
    apiKey: process.env.API_KEY,
    version: {
      build: versionInfo?.build || UNKNOWN,
      commit: versionInfo?.commit || UNKNOWN,
    },
    versioningOptions: {
      type: VersioningType.URI,
      prefix: URI_VERSIONING_PREFIX,
      defaultVersion: DEFAULT_VERSION,
    },
    corsOptions: {
      origin: '*',
      methods: ['OPTIONS', 'HEAD', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    },
    logger: {
      enabled: process.env.LOGGER_ENABLED !== 'false',
      level: process.env.LOGGER_LEVEL || 'info',
      redact: ['password', 'headers.cookie', 'headers.authorization'],
    },
  };
});
