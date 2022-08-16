import { ApiException } from '@common/exceptions';
import { PRICONNE_APP_VERSION_OUTDATED } from '@libraries/priconne-client/priconne.constants';

export class PriconneAppVersionOutdatedException extends ApiException {
  constructor(currentVersion: string) {
    super({ code: PRICONNE_APP_VERSION_OUTDATED, payload: { currentVersion } });
  }
}
