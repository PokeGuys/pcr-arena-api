import { registerAs } from '@nestjs/config';
import {
  DECIMAL_RADIX_BASE,
  DEFAULT_HTTP_BIND_HOST,
  DEFAULT_HTTP_BIND_PORT,
  HTTP_CONFIG_NAMESPACE,
} from '@common/constants';
import type { HttpConfig } from '@config/interfaces';

export const httpConfig = registerAs(HTTP_CONFIG_NAMESPACE, (): HttpConfig => {
  const port = parseInt(process.env.PORT || DEFAULT_HTTP_BIND_PORT, DECIMAL_RADIX_BASE);
  return {
    port,
    host: process.env.HOST || DEFAULT_HTTP_BIND_HOST,
  };
});
