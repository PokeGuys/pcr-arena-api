import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import {
  PriconneModuleAsyncOptions,
  PriconneModuleOptions,
  PriconneOptionsFactory,
} from './interfaces';
import { PriconneClient } from './priconne.client';
import { PRICONNE_MODULE_OPTIONS } from './priconne.constants';

@Global()
@Module({
  imports: [HttpModule],
  providers: [PriconneClient],
  exports: [PriconneClient],
})
export class PriconneModule {
  public static forRoot(options?: PriconneModuleOptions): DynamicModule {
    return {
      module: PriconneModule,
      providers: [
        {
          provide: PRICONNE_MODULE_OPTIONS,
          useValue: options || {},
        },
      ],
    };
  }

  public static forRootAsync(options: PriconneModuleAsyncOptions): DynamicModule {
    return {
      module: PriconneModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
    };
  }

  private static createAsyncProviders(options: PriconneModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const useClass = options.useClass as Type<PriconneOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: PriconneModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: PRICONNE_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [(options.useClass || options.useExisting) as Type<PriconneOptionsFactory>];
    return {
      provide: PRICONNE_MODULE_OPTIONS,
      useFactory: async (optionsFactory: PriconneOptionsFactory) =>
        optionsFactory.createPriconneOptions(),
      inject,
    };
  }
}
