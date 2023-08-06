import { Injectable } from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/req/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/req/update-expense-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseCategory } from './entities/expense-category.entity';

@Injectable()
export class ExpenseCategoryService {
  constructor(
    @InjectRepository(ExpenseCategory)
    private readonly expenseCategoryRepository: Repository<ExpenseCategory>,
  ) {}
  create(createExpenseCategoryDto: CreateExpenseCategoryDto) {
    return 'This action adds a new expenseCategory';
  }

  async findAll(): Promise<ExpenseCategory[]> {
    return this.expenseCategoryRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} expenseCategory`;
  }

  async findByName(a: string) {
    return await this.expenseCategoryRepository.findOne({
      where: {
        name: a,
      },
    });
  }

  update(id: number, updateExpenseCategoryDto: UpdateExpenseCategoryDto) {
    return `This action updates a #${id} expenseCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenseCategory`;
  }
}
