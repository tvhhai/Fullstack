import { BaseEntity } from 'src/shared/base.entity';
import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';
import { IPermissions } from 'src/shared/model/permissions.model';

@Entity()
export class Role extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  systemDefine: boolean;

  @Column('json')
  permissions: IPermissions[];

  constructor(partial: Partial<Role>) {
    super();
    Object.assign(this, partial);
  }
}
