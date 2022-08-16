import { randomInt, randomBytes, createHash, createCipheriv, createDecipheriv } from 'crypto';
import { PriconneRequestDto } from '@libraries/priconne-client/dtos';
import { SESSION_SALT } from '@libraries/priconne-client/priconne.constants';

export const calculateSessionId = (sessionId: string) =>
  createHash('md5').update(`${sessionId}${SESSION_SALT}`).digest('hex');

export const calculateRequestChecksum = (
  secret: PriconneRequestDto,
  fullURL: string,
  encryptedPayload: Buffer,
) =>
  createHash('sha1')
    .update(`${secret.udid}${fullURL}${encryptedPayload.toString('base64')}${secret.viewerId}`)
    .digest('hex');

export const convertUdidToIv = (udid: string) => Buffer.from(udid.replace(/-/g, '').slice(0, 16));

export const generateIv = () => [...Array(32)].map(() => randomInt(0, 9)).join('');

export const generateSymmetricKey = () => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charsetLength = charset.length;
  const buffer = randomBytes(32);
  return Buffer.from(buffer.map((value: number) => charset[value % charsetLength].charCodeAt(0)));
};

export const encodeUdid = (shortUdid: string) => {
  const shortUdidLength = shortUdid.length.toString(16).padStart(4, '0');
  const ciphertext = shortUdid
    .split('')
    .map((char) => {
      const cipher = String.fromCharCode(char.charCodeAt(0) + 10);
      return `${randomInt(10, 99)}${cipher}${randomInt(0, 9)}`;
    })
    .join('');
  return `${shortUdidLength}${ciphertext}${generateIv()}`;
};

export const encryptAes256 = (pt: Buffer, udid: string) => {
  // Generate a random key and convert udid into IV.
  const key = generateSymmetricKey();
  const iv = convertUdidToIv(udid);
  const cipher = createCipheriv('aes-256-cbc', key, iv);
  // Ciphertext payload: AES-256-CBC(pt) + key
  return Buffer.concat([cipher.update(pt), cipher.final(), key]);
};

export const decryptAes256 = (ct: Buffer, key: Buffer, iv: Buffer) => {
  const decipher = createDecipheriv('aes-256-cbc', key, iv);
  return Buffer.concat([decipher.update(ct), decipher.final()]);
};
