import { BaseEntity } from '../../../shared/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class ActionLog extends BaseEntity {
  @ManyToOne(() => User, (user) => user.actionLogs)
  user: User;

  @Column({ length: 50 })
  content: string;
}
