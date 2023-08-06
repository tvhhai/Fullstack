import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Wallet extends BaseEntity {
  @ManyToOne(() => User, (user) => user.personalExpense)
  user: User;

  @Column()
  nameWallet: boolean;

  @Column()
  amount: number;

  @Column()
  active: boolean;
}
