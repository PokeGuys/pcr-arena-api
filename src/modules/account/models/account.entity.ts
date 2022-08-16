import { Entity, OptionalProps, Property, Unique } from '@mikro-orm/core';
import type { Server } from '@libraries/priconne-client/enums';
import { IEntity, AbstractEntity } from '@common/models';
import { AccountDto } from '@modules/account/dtos';
import type { BaseAccount, AccountType } from '@modules/account/interfaces';

@Entity()
@Unique({ properties: ['server', 'udid', 'shortUdid'] })
export class Account
  extends AbstractEntity<AccountDto, AccountType>
  implements BaseAccount, AccountType
{
  public [OptionalProps]?: IEntity[typeof OptionalProps];

  @Property({ type: 'enum' })
  public server!: Server;

  @Property({ type: 'uuid' })
  public udid!: string;

  @Property()
  public shortUdid!: string;

  @Property()
  public viewerId!: string;

  protected dtoClass = AccountDto;

  public toObject(): AccountType {
    return {
      id: this.id,
      server: this.server,
      udid: this.udid,
      shortUdid: this.shortUdid,
      viewerId: this.viewerId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
