import { Server } from '@libraries/priconne-client/enums';

export const buildMutexLockKey = (server: Server, viewerId: string): string =>
  `${server}-${viewerId}`;
