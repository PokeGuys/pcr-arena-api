import { Server } from '@libraries/priconne-client/enums';

export type PriconneRequestDto = {
  server: Server;
  udid: string;
  shortUdid: string;
  viewerId: string;
  requestId?: string;
  sid?: string;
};
