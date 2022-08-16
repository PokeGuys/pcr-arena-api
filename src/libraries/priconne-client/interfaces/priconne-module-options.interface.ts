import { ModuleMetadata, Type } from '@nestjs/common';
import { Locale, Platform } from '@libraries/priconne-client/enums';

export type PriconneModuleOptions = {
  debug?: boolean;

  // Client
  userAgent?: string;
  appVersion?: string;
  resourceVersion?: string;
  battleLogicVersion?: string;
  bundleVersion?: string;
  // Device
  device?: string;
  deviceId?: string;
  deviceName?: string;
  graphicDeviceName?: string;
  platformVersion?: string;
  phoneCarrier?: string;
  // Misc
  keyChain?: string;
  platform?: Platform;
  locale?: Locale;
  unityVersion?: string;
};

export interface PriconneOptionsFactory {
  createPriconneOptions(): Promise<PriconneModuleOptions> | PriconneModuleOptions;
}

export interface PriconneModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<PriconneOptionsFactory>;
  useClass?: Type<PriconneOptionsFactory>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFactory?: (...args: any[]) => Promise<PriconneModuleOptions> | PriconneModuleOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inject?: any[];
}
