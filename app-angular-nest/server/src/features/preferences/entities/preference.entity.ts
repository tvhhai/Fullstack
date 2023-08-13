import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BaseEntity } from '../../../shared/base.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Preference extends BaseEntity {
  @Column({ length: 50 })
  settingKey: string;

  @Column({ type: 'json' })
  settingValue: string;

  @ManyToOne(() => User, (user) => user.preferences)
  user: User;

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Exclude()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
