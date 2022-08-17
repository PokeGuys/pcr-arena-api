import type { pino } from 'pino';
import type { VersioningOptions } from '@nestjs/common';
import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import type { VersionInfo } from '@common/dtos';
import type { AppEnvironment, Language } from '@common/enums';

export type AppConfig = {
  debug: boolean;
  fallbackLanguage: Language;
  prefix?: string;
  env: AppEnvironment;
  host: string;
  apiKey: string;
  version: VersionInfo;
  versioningOptions?: VersioningOptions;
  corsOptions?: CorsOptions;
  logger: {
    enabled: boolean;
    level: pino.LevelWithSilent;
    redact: string[];
  };
};
