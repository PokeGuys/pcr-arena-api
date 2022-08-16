import { MikroORM } from '@mikro-orm/core';
import { Injectable, Scope } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
  TimeoutError,
} from '@nestjs/terminus';
import { TimeoutError as PromiseTimeoutError, promiseTimeout } from '@nestjs/terminus/dist/utils';
import { DEFAULT_HEALTH_CHECK_TIMEOUT } from '@modules/health/health.constants';

export interface MikroOrmPingCheckSettings {
  /**
   * The connection which the ping check should get executed
   */
  connection?: MikroORM;

  /**
   * The amount of time the check should require in ms
   */
  timeout?: number;
}

@Injectable({ scope: Scope.TRANSIENT })
export class MikroOrmHealthIndicator extends HealthIndicator {
  constructor(private readonly orm: MikroORM) {
    super();
  }

  private async pingDb(connection: MikroORM, timeout: number) {
    return promiseTimeout(timeout, connection.isConnected());
  }

  public async pingCheck(
    key: string,
    options: MikroOrmPingCheckSettings = {},
  ): Promise<HealthIndicatorResult> {
    let isHealthy = false;
    const connection = options.connection || this.orm;
    const timeout = options.timeout || DEFAULT_HEALTH_CHECK_TIMEOUT;

    try {
      await this.pingDb(connection, timeout);
      isHealthy = true;
    } catch (err) {
      if (err instanceof PromiseTimeoutError) {
        throw new TimeoutError(
          timeout,
          this.getStatus(key, isHealthy, {
            message: `timeout of ${timeout}ms exceeded`,
          }),
        );
      }
    }

    if (isHealthy) {
      return this.getStatus(key, isHealthy);
    }
    throw new HealthCheckError(`${key} is not available`, this.getStatus(key, isHealthy));
  }
}
