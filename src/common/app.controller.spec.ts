import { VersionInfo } from '@common/dtos/version-info';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@common/app.controller';
import { ConfigService } from '@nestjs/config';

const testVersion: VersionInfo = {
  commit: 'test commit hash',
  build: 'test build id',
};

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => {
              return testVersion;
            }),
          },
        },
      ],
    }).compile();

    appController = app.get(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getVersion', () => {
    it('should return the version of application stored in app.version', () => {
      expect(appController.getVersion()).toStrictEqual(testVersion);
    });
  });
});
