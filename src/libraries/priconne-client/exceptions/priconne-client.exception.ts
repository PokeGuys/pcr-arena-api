import { ApiException } from '@common/exceptions';
import { PRICONNE_API_ERROR } from '@libraries/priconne-client/priconne.constants';

export class PriconneClientException extends ApiException {
  public readonly errorStatus: number;

  public readonly errorResultCode?: any;

  constructor(message: string, status: number, resultCode?: any) {
    super({ code: PRICONNE_API_ERROR, payload: { status, resultCode } });
    this.message = message;
    this.errorStatus = status;
    this.errorResultCode = resultCode;
  }
}
