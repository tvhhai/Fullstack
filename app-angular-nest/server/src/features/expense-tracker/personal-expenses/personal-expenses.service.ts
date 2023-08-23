import { Injectable } from '@nestjs/common';
import { CreatePersonalExpenseDto } from './dto/req/create-personal-expense.dto';
import { UpdatePersonalExpenseDto } from './dto/req/update-personal-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalExpense } from './entities/personal-expense.entity';
import { Between, Repository } from 'typeorm';
import { User } from '@features/rbac/users/entities/user.entity';
import { ExpenseCategory } from '../expense-category/entities/expense-category.entity';
import { WalletService } from '../wallet/wallet.service';
import { EExpenseCategory } from '../expense-category/enum/expense-category.enum';
import { UpdateWalletDto } from '../wallet/dto/req/update-wallet.dto';
import { Wallet } from '../wallet/entities/wallet.entity';

@Injectable()
export class PersonalExpensesService {
  constructor(
    @InjectRepository(PersonalExpense)
    private readonly personalExpenseRepository: Repository<PersonalExpense>,
    private readonly walletService: WalletService,
  ) {}

  async create(
    personalExpenseData: Partial<CreatePersonalExpenseDto>,
  ): Promise<PersonalExpense> {
    const wallet = await this.walletService.findOneById(
      personalExpenseData.wallet,
    );

    const total = this.calculateUpdatedWalletAmount(
      wallet.amount,
      personalExpenseData,
    );

    await this.updateWalletAmount(wallet.id, total);

    return this.personalExpenseRepository.save(personalExpenseData);
  }

  private calculateUpdatedWalletAmount(
    walletAmount: number,
    personalExpenseData: Partial<CreatePersonalExpenseDto>,
  ): number {
    const amount = personalExpenseData.amount;
    if (personalExpenseData.expenseCategory.type === EExpenseCategory.INCOME) {
      return walletAmount + amount;
    } else {
      return walletAmount - amount;
    }
  }

  private async updateWalletAmount(
    walletId: number,
    total: number,
  ): Promise<void> {
    const walletUpdate: UpdateWalletDto = {
      amount: total,
    };
    await this.walletService.update(walletId, walletUpdate);
  }

  async calculateTotalExpense(id: User): Promise<PersonalExpense | number> {
    const { sumExpense } = await this.personalExpenseRepository
      .createQueryBuilder('personal-expense')
      .leftJoin('personal-expense.expenseCategory', 'expenseCategory')
      .where('personal-expense.userId=:userId', { userId: id })
      .andWhere('expenseCategory.type="expense"', { userId: id })
      .select('SUM(personal-expense.amount)', 'sumExpense')
      .getRawOne();
    return sumExpense || 0;
  }

  async calculateTotalIncome(id: User): Promise<PersonalExpense | number> {
    const { sumIncome } = await this.personalExpenseRepository
      .createQueryBuilder('personal-expense')
      .leftJoin('personal-expense.expenseCategory', 'expenseCategory')
      .where('personal-expense.userId=:userId', { userId: id })
      .andWhere('expenseCategory.type="income"', { userId: id })
      .select('SUM(personal-expense.amount)', 'sumIncome')
      .getRawOne();
    return sumIncome || 0;
  }

  async findAll(user: User): Promise<PersonalExpense[]> {
    return this.personalExpenseRepository.find({
      where: {
        user: { id: user.id },
      },
      order: {
        created_at: 'DESC',
      },
      relations: ['expenseCategory', 'user'],
    });
  }

  async findByDate(
    data: { startDate: Date; endDate: Date },
    user: User,
  ): Promise<PersonalExpense[]> {
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
    const data = this.personalExpenseRepository.findOne({
      where: { id },
      relations: ['expenseCategory'],
    });

    if (!data) throw new Error('Data not found');

    return data;
  }

  async update(
    id: number,
    data: UpdatePersonalExpenseDto,
  ): Promise<PersonalExpense> {
    const [wallet, personalExpense] = await Promise.all([
      this.walletService.findOneById(data.wallet),
      this.personalExpenseRepository.findOne({ where: { id } }),
    ]);

    const updatedPersonalExpense = await this.updatePersonalExpense(
      personalExpense,
      data,
    );
    await this.updateWalletBalance(wallet, data.user);

    return updatedPersonalExpense;
  }

  private async updatePersonalExpense(
    personalExpense: PersonalExpense,
    data: UpdatePersonalExpenseDto,
  ): Promise<PersonalExpense> {
    const updateData: PersonalExpense = {
      ...personalExpense,
      ...data,
    };
    return this.personalExpenseRepository.save(updateData);
  }

  private async updateWalletBalance(
    wallet: Wallet,
    userId: User,
  ): Promise<void> {
    if (wallet) {
      const sumExpense = await this.calculateTotalExpense(userId);
      const sumIncome = await this.calculateTotalIncome(userId);

      const balance: number = wallet.balance;
      const total = balance + Number(sumIncome) - Number(sumExpense);
      const walletUpdate: UpdateWalletDto = {
        amount: total,
      };
      await this.walletService.update(wallet.id, walletUpdate);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} personalExpense`;
  }
}
