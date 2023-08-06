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
import { DataRes } from '../../shared/dto/res/data-res.dto';
import { PersonalExpense } from './entities/personal-expense.entity';
import { ExpenseCategoryService } from '../expense-category/expense-category.service';
import { JwtGuards } from '../../auth/guards/jwt.guard';
import { UsersService } from '../users/users.service';

@Controller('api/personal-expenses')
export class PersonalExpensesController {
  constructor(
    private readonly personalExpensesService: PersonalExpensesService,
    private readonly expenseCategoryService: ExpenseCategoryService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(
    @Body() createPersonalExpenseDto: CreatePersonalExpenseDto,
  ): Promise<DataRes<PersonalExpense[]>> {
    try {
      const personalExpense = await this.personalExpensesService.create(
        createPersonalExpenseDto,
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: [personalExpense],
      };
    } catch (err) {}
  }

  @UseGuards(JwtGuards)
  @Post('/report')
  async getReport(
    @Body() data: any,
    @Req() req,
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
  async findAll(@Req() req): Promise<DataRes<PersonalExpense[]>> {
    const user = await this.usersService.findOnlyUserById(req.user.id);
    const personalExpenses = await this.personalExpensesService.findAll(user);

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: personalExpenses,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalExpensesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePersonalExpenseDto: UpdatePersonalExpenseDto,
  ) {
    return this.personalExpensesService.update(+id, updatePersonalExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalExpensesService.remove(+id);
  }
}
