import { BaseEntity } from '../../../shared/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../rbac/users/entities/user.entity';

@Entity()
export class TableSetting extends BaseEntity {
  @ManyToOne(() => User, (user) => user.tableSetting)
  user: User;

  @Column({ length: 50 })
  tableId: string;

  @Column('json')
  tableConfig: string;
}
