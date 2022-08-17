import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { BaseConfig } from '@config/interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly config: ConfigService<BaseConfig, true>) {}

  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const clientSecret = request.header('X-API-KEY');
    const appSecret = this.config.get('app.apiKey', { infer: true });

    return appSecret === clientSecret;
  }
}
