import { Injectable } from '@nestjs/common';
import { CreatePersonalExpenseDto } from './dto/req/create-personal-expense.dto';
import { UpdatePersonalExpenseDto } from './dto/req/update-personal-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalExpense } from './entities/personal-expense.entity';
import { Between, Repository } from "typeorm";
import { User } from '../users/entities/user.entity';
import { ExpenseCategory } from '../expense-category/entities/expense-category.entity';

@Injectable()
export class PersonalExpensesService {
  constructor(
    @InjectRepository(PersonalExpense)
    private readonly personalExpenseRepository: Repository<PersonalExpense>,
  ) {}

  async create(
    personalExpenseData: Partial<CreatePersonalExpenseDto>,
  ): Promise<PersonalExpense> {
    return this.personalExpenseRepository.save(personalExpenseData);
  }

  async findAll(user: User): Promise<PersonalExpense[]> {
    return this.personalExpenseRepository.find({
      where: {
        user: { id: user.id },
      },
      order: {
        created_at: 'DESC', // "DESC"
      },
      relations: ['expenseCategory', 'user'],
    });
  }

  async findByDate(data: any, user: User): Promise<PersonalExpense[]> {
    return this.personalExpenseRepository.find({
      where: {
        date: Between(data.startDate, data.endDate),
        user: { id: user.id },
      },
      order: {
        created_at: 'ASC',
      },
      relations: ['expenseCategory'],
    });
  }

  async findByExpenseCategory(a: ExpenseCategory): Promise<PersonalExpense[]> {
    return this.personalExpenseRepository.find({
      where: {
        expenseCategory: { id: a.id },
      },
      relations: ['expenseCategory'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} personalExpense`;
  }

  update(id: number, updatePersonalExpenseDto: UpdatePersonalExpenseDto) {
    return `This action updates a #${id} personalExpense`;
  }

  remove(id: number) {
    return `This action removes a #${id} personalExpense`;
  }
}
