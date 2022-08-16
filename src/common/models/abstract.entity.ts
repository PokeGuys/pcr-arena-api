import { AbstractDto } from '@common/dtos/abstract.dto';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ClassConstructor, ClassTransformOptions, plainToClass } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { IEntityType } from './entity.interface';

@Entity({ abstract: true })
export abstract class AbstractEntity<
  T extends AbstractDto = AbstractDto,
  PlainObject extends IEntityType = IEntityType,
> implements IEntityType
{
  @PrimaryKey({ type: 'uuid' })
  public id: string = uuidv4();

  @Property()
  public createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  protected abstract dtoClass: ClassConstructor<T>;

  public toDto(options?: ClassTransformOptions): T {
    return plainToClass(this.dtoClass, this, options);
  }

  public abstract toObject(): PlainObject;
}
