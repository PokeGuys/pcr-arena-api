import { randomInt } from 'crypto';
import type { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Locale, Platform, Server } from './enums';
import * as PriconneRoutes from './priconne.routes';
import { PriconneModuleOptions } from './interfaces';
import { BaseApiResponse, PriconneRequestDto } from './dtos';
import { InjectPriconneConfig } from './priconne.decorator';
import { prepareRequest } from './utils/request.util';
import { PriconneAppVersionOutdatedException, PriconneClientException } from './exceptions';
import { decryptResponsePayload } from './utils/response.util';

@Injectable()
export class PriconneClient {
  protected readonly logger = new Logger(PriconneClient.name);

  protected resourcesVersion = '';

  constructor(
    @InjectPriconneConfig() private readonly cfg: PriconneModuleOptions,
    private readonly http: HttpService,
  ) {}

  public async authenticate(param: PriconneRequestDto): Promise<any> {
    await this.checkAgreement(param);
    await this.gameStart(param);
    return this.loadIndex(param);
  }

  public async loadIndex(param: PriconneRequestDto): Promise<any> {
    return lastValueFrom(
      this.send(param.server, PriconneRoutes.LOAD_INDEX, param, {
        data: {
          carrier: this.cfg.phoneCarrier || 'OnePlus',
        },
      }),
    );
  }

  protected async gameStart(param: PriconneRequestDto): Promise<void> {
    return lastValueFrom(
      this.send(param.server, PriconneRoutes.GAME_START, param, {
        data: {
          app_type: '0',
          campaign_data: '',
          campaign_user: randomInt(0, 100000) * 2,
        },
      }),
    );
  }

  protected async checkAgreement(param: PriconneRequestDto): Promise<void> {
    await lastValueFrom(this.send(param.server, PriconneRoutes.CHECK_AGREEMENT, param));
  }

  public async getProfile(id: number, param: PriconneRequestDto): Promise<any> {
    return lastValueFrom(
      this.send(param.server, PriconneRoutes.GET_PROFILE, param, {
        data: { target_viewer_id: id },
      }),
    );
  }

  protected get defaultOptions() {
    return {
      // Client
      userAgent: 'Dalvik/2.1.0 (Linux; U; Android 7.1.2; HD1900 Build/N2G47O)',
      appVersion: '3.4.0',
      battleLogicVersion: '4',
      resourceVersion: '00080014',
      bundleVersion: '',
      // Device
      device: '2',
      deviceId: '',
      deviceName: 'OnePlus HD1900',
      graphicDeviceName: 'Adreno (TM) 640',
      platformVersion: 'Android OS 7.1.2 / API-25 (N2G48C/N975FXXU1ASGO)',
      // Misc
      keyChain: '',
      platform: Platform.Android,
      locale: Locale.Japan,
      unityVersion: '2018.4.21f1',
    };
  }

  protected buildFullURL(server: Server, endpoint: string): string {
    return new URL(endpoint, this.getServerBaseUrl(server)).toString();
  }

  protected getServerBaseUrl(server: Server): string {
    const apiServers = {
      [Server.GourmetEdifice]: 'https://api1-pc.so-net.tw',
      [Server.MahoMahoKindom]: 'https://api2-pc.so-net.tw',
      [Server.TwinkleWish]: 'https://api3-pc.so-net.tw',
      [Server.LittleLyrical]: 'https://api4-pc.so-net.tw',
    };

    return apiServers[server];
  }

  protected send<T = BaseApiResponse, D = any>(
    server: Server,
    action: string,
    secret: PriconneRequestDto,
    options?: AxiosRequestConfig<D>,
  ): Observable<T> {
    const cfg = {
      ...this.defaultOptions,
      ...this.cfg,
    };
    const fullURL = this.buildFullURL(server, action);
    this.logger.debug(`Sending request to ${fullURL}`);
    const [payload, headers] = prepareRequest(secret, action, options?.data);
    return this.http
      .request<string>({
        ...options,
        ...(payload && { data: payload }),
        url: fullURL,
        method: 'POST',
        headers: {
          ...options?.headers,
          'Content-Type': 'application/octet-stream',
          // Client
          'User-Agent': cfg.userAgent,
          'APP-VER': cfg.appVersion,
          'RES-VER': this.resourcesVersion || cfg.resourceVersion,
          'BATTLE-LOGIC-VERSION': cfg.battleLogicVersion,
          'BUNDLE-VERSION': cfg.bundleVersion,
          // Device
          DEVICE: cfg.device,
          'DEVICE-ID': cfg.deviceId,
          'DEVICE-NAME': cfg.deviceName,
          'GRAPHICS-DEVICE-NAME': cfg.graphicDeviceName,
          'PLATFORM-OS-VERSION': cfg.platformVersion,
          // Misc
          KEYCHAIN: cfg.keyChain,
          PLATFORM: cfg.platform.toString(),
          LOCALE: cfg.locale.toString(),
          'X-UNITY-VERSION': cfg.unityVersion,
          'REGION-CODE': '',
          ...headers,
        },
      })
      .pipe(
        map(({ data }) => {
          this.logger.debug({ data }, 'API Response data');
          return decryptResponsePayload(data, secret);
        }),
        map((data) => {
          this.logger.debug({ data }, 'Decrypted API Response');
          const { data: body, data_headers: responseHeaders } = data;
          if (responseHeaders.result_code === 204) {
            throw new PriconneAppVersionOutdatedException(cfg.appVersion);
          }

          if (body.server_error) {
            const error = body.server_error;
            throw new PriconneClientException(error.message, error.status, error.result_code);
          }

          // Do we really need this?
          // Update viewer id (sign up?)
          const responseViewerId = responseHeaders.viewer_id.toString();
          const responseShortUdid = responseHeaders.short_udid.toString();
          if (responseHeaders.viewer_id && secret.viewerId !== responseViewerId) {
            // eslint-disable-next-line no-param-reassign
            secret.viewerId = responseViewerId;
          }
          if (responseHeaders.short_udid && secret.shortUdid !== responseShortUdid) {
            // eslint-disable-next-line no-param-reassign
            secret.shortUdid = responseShortUdid;
          }
          if (responseHeaders.sid) {
            // eslint-disable-next-line no-param-reassign
            secret.sid = responseHeaders.sid.toString();
          }
          if (responseHeaders.request_id) {
            // eslint-disable-next-line no-param-reassign
            secret.requestId = responseHeaders.request_id.toString();
          }

          if (responseHeaders.required_res_ver) {
            this.resourcesVersion = responseHeaders.required_res_ver.toString();
          }

          return data;
        }),
      );
  }
}
