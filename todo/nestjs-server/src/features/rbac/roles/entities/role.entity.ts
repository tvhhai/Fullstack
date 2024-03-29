import { BaseEntity } from '@shared/base.entity';
import { Entity, Column } from 'typeorm';
import { IPermissions } from '@shared/model/permissions.model';

@Entity()
export class Role extends BaseEntity {
  @Column({ unique: true, length: 50 })
  name: string;

  @Column({ nullable: true })
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
