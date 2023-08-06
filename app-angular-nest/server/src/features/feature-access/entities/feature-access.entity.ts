import { BaseEntity } from 'src/shared/base.entity';
import { Entity, Column } from 'typeorm';
import { EPermission } from 'src/features/permissions/enum/permission.enum';

@Entity()
export class FeatureAccess extends BaseEntity {
  @Column({ unique: true, nullable: false, length: 50 })
  feature: string;

  @Column('simple-array')
  accessList: EPermission[];
}
