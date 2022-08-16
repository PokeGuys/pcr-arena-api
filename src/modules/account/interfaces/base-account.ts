import type { Server } from '@libraries/priconne-client/enums/server.enum';

export interface BaseAccount {
  id: string;
  server: Server;
  udid: string;
  shortUdid: string;
  viewerId: string;
  createdAt: Date;
  updatedAt: Date;
}
