import type { pino } from 'pino';
import type { AppEnvironment, Language } from '@common/enums';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DEBUG?: 'true' | 'false';

      APP_ENV: AppEnvironment;
      APP_NAME: string;
      APP_PREFIX?: string;
      APP_HOST: string;
      API_KEY: string;
      FALLBACK_LANGUAGE?: Language;

      DB_HOST: string;
      DB_PORT?: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_DATABASE: string;

      LOGGER_ENABLED?: 'true' | 'false';
      LOGGER_LEVEL?: pino.LevelWithSilent;
    }
  }
}

export {};
