import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../shared/base.entity';
import { User } from '../../../rbac/users/entities/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Wallet extends BaseEntity {
  @ManyToOne(() => User, (user) => user.personalExpense)
  user: User;

  @Column()
  nameWallet: string;

  @Column()
  amount: number;

  @Column({ update: false })
  @Exclude()
  balance: number;

  @Column()
  active: boolean;
}
