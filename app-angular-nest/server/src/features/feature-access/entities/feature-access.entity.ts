import { BaseEntity } from 'src/shared/base.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { IPermissions } from 'src/shared/model/permissions.model';
import { EPermission } from 'src/features/permissions/enum/permission.enum';

@Entity()
export class FeatureAccess extends BaseEntity {
  @Column({ unique: true, nullable: false })
  feature: string;

  @Column('simple-array')
  accessList: EPermission[];
}
