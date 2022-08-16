import msgpack from 'msgpack-lite';
import { PriconneRequestDto } from '@libraries/priconne-client/dtos';
import { convertUdidToIv, decryptAes256 } from './cryptography.util';

export const decryptResponsePayload = (data: string, secret: PriconneRequestDto) => {
  const responseBytes = Buffer.from(data, 'base64');
  const iv = convertUdidToIv(secret.udid);
  const payload = responseBytes.subarray(0, responseBytes.length - 32);
  const encryptionKey = responseBytes.subarray(responseBytes.length - 32);
  const pt = decryptAes256(payload, encryptionKey, iv);
  return msgpack.decode(pt);
};
