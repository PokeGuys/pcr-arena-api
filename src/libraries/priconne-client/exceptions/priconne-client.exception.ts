import { ApiException } from '@common/exceptions';
import { PRICONNE_API_ERROR } from '@libraries/priconne-client/priconne.constants';

export class PriconneClientException extends ApiException {
  constructor(message: string, status: number, resultCode: number) {
    super({ code: PRICONNE_API_ERROR, payload: { status, resultCode } });
    this.message = message;
  }
}
