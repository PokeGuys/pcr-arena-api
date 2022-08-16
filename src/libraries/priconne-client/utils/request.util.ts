import msgpack from 'msgpack-lite';
import { PriconneRequestDto } from '@libraries/priconne-client/dtos';
import {
  calculateSessionId,
  calculateRequestChecksum,
  encodeUdid,
  encryptAes256,
} from './cryptography.util';

export const prepareRequest = (
  secret: PriconneRequestDto,
  action: string,
  data?: any,
): [Buffer, Record<string, string>] => {
  // Serialize request data into MsgPack and encrypt it with AES-256-CBC
  const packedPayload = msgpack.encode({
    ...data,
    ...(secret.viewerId && {
      viewer_id: encryptAes256(Buffer.from(secret.viewerId), secret.udid).toString('base64'),
    }),
  });
  const encryptedPayload = encryptAes256(packedPayload, secret.udid);
  const headers = {
    'SHORT-UDID': encodeUdid(secret.shortUdid),
    UDID: encodeUdid(secret.udid),
    SID: calculateSessionId(secret.sid || `${secret.viewerId}${secret.udid}`),
    PARAM: calculateRequestChecksum(secret, action, packedPayload),
    ...(secret.requestId && { 'REQUEST-ID': secret.requestId }),
  };
  return [encryptedPayload, headers];
};
