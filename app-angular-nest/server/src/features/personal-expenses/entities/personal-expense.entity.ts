import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/base.entity';
import { ExpenseCategory } from '../../expense-category/entities/expense-category.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class PersonalExpense extends BaseEntity {
  @Column()
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  note: string;

  @ManyToOne(() => ExpenseCategory, (msg) => msg.personalExpense)
  expenseCategory: ExpenseCategory;

  @ManyToOne(() => User, (user) => user.personalExpense)
  user: User;
}
