import { Module } from '@nestjs/common';
import { PersonalExpensesService } from './personal-expenses.service';
import { PersonalExpensesController } from './personal-expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalExpense } from './entities/personal-expense.entity';
import { ExpenseCategoryModule } from '../expense-category/expense-category.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonalExpense]),
    ExpenseCategoryModule,
    UsersModule,
  ],
  controllers: [PersonalExpensesController],
  providers: [PersonalExpensesService],
  exports: [PersonalExpensesService],
})
export class PersonalExpensesModule {}
