import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PersonalExpensesService } from './personal-expenses.service';
import { CreatePersonalExpenseDto } from './dto/req/create-personal-expense.dto';
import { UpdatePersonalExpenseDto } from './dto/req/update-personal-expense.dto';
import { DataRes } from '../../../shared/dto/res/data-res.dto';
import { PersonalExpense } from './entities/personal-expense.entity';
import { ExpenseCategoryService } from '../expense-category/expense-category.service';
import { JwtGuards } from '../../../auth/guards/jwt.guard';
import { UsersService } from '@features/rbac/users/users.service';

@Controller('api/personal-expenses')
export class PersonalExpensesController {
  constructor(
    private readonly personalExpensesService: PersonalExpensesService,
    private readonly expenseCategoryService: ExpenseCategoryService,
    private readonly usersService: UsersService, // private readonly walletService: WalletService,
  ) {}

  @Post()
  async create(
    @Body() createPersonalExpenseDto: CreatePersonalExpenseDto,
  ): Promise<DataRes<PersonalExpense[]>> {
    try {
      // const wallet = await this.walletService.findOneById(
      //   createPersonalExpenseDto.wallet,
      // );
      //
      // console.log(wallet);

      const personalExpense = await this.personalExpensesService.create(
        createPersonalExpenseDto,
      );
      //
      // return {
      //   statusCode: HttpStatus.OK,
      //   message: 'Success',
      //   data: [personalExpense],
      // };

      return null;
    } catch (err) {}
  }

  @UseGuards(JwtGuards)
  @Post('/report')
  async getReport(
    @Body() data: any,
    @Req() req: any,
  ): Promise<DataRes<PersonalExpense[]>> {
    try {
      const user = await this.usersService.findOnlyUserById(req.user.id);
      const personalExpense = await this.personalExpensesService.findByDate(
        data,
        user,
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: personalExpense,
      };
    } catch (err) {}
  }

  @UseGuards(JwtGuards)
  @Get()
  async findAll(@Req() req: any): Promise<DataRes<PersonalExpense[]>> {
    const user = await this.usersService.findOnlyUserById(req.user.id);
    const personalExpenses = await this.personalExpensesService.findAll(user);

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: personalExpenses,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const personalExpenses = await this.personalExpensesService.findOne(+id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: personalExpenses,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePersonalExpenseDto: UpdatePersonalExpenseDto,
  ) {
    try {
      const data = await this.personalExpensesService.update(
        id,
        updatePersonalExpenseDto,
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: data,
      };
    } catch (err) {}
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalExpensesService.remove(+id);
  }
}
