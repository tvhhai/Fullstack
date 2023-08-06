import { IsNotEmpty } from 'class-validator';
import { User } from '../../../users/entities/user.entity';
import { ExpenseCategory } from '../../../expense-category/entities/expense-category.entity';

export class CreatePersonalExpenseDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  date: Date;

  note: string;

  // @IsNotEmpty()
  // expenseCategoryRequest: string;
  @IsNotEmpty()
  expenseCategory: ExpenseCategory;

  @IsNotEmpty()
  user: User;
}
