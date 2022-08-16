import { OptionalProps } from '@mikro-orm/core';

export type IEntityType = Omit<IEntity, typeof OptionalProps>;

export interface IEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  [OptionalProps]?: 'createdAt' | 'updatedAt';
}
