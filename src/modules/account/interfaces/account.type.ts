import type { IEntityType } from '@common/models';
import type { Server } from '@libraries/priconne-client/enums';

export type AccountType = IEntityType & {
  server: Server;
  udid: string;
  shortUdid: string;
  viewerId: string;
};
