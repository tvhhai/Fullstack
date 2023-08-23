import { BaseEntity } from '../../../../shared/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PersonalExpense } from '../../personal-expenses/entities/personal-expense.entity';
import { EExpenseCategory } from '../enum/expense-category.enum';

@Entity()
export class ExpenseCategory extends BaseEntity {
  @OneToMany(() => PersonalExpense, (user) => user.expenseCategory)
  personalExpense: PersonalExpense[];

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  type: EExpenseCategory;

  @Column({ length: 50 })
  icon: string;
}
