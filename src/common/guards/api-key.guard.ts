import * as R from 'ramda';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { BaseConfig } from '@config/interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly config: ConfigService<BaseConfig, true>) {}

  public canActivate(context: ExecutionContext): boolean {
    if (this.config.get('app.debug', { infer: true })) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const clientSecret = R.path(['headers', 'x-api-key'], request);
    const appSecret = this.config.get('app.apiKey', { infer: true });

    return appSecret === clientSecret;
  }
}
