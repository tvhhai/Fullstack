import { BaseEntity } from 'src/shared/base.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { IPermissions } from 'src/shared/model/permissions.model';
 
@Entity()
export class FeatureAccess extends BaseEntity {
  @Column('json')
  permission: IPermissions[];

  @Column()
  feature: string;
}
