import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ExpenseCategoryService } from './expense-category.service';
import { CreateExpenseCategoryDto } from './dto/req/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/req/update-expense-category.dto';
import { DataRes } from '../../shared/dto/res/data-res.dto';
import { ExpenseCategory } from './entities/expense-category.entity';

@Controller('api/expense-category')
export class ExpenseCategoryController {
  constructor(
    private readonly expenseCategoryService: ExpenseCategoryService,
  ) {}

  @Post()
  async create(@Body() data: CreateExpenseCategoryDto) {
    const expenseCategory = await this.expenseCategoryService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: expenseCategory,
    };
  }

  @Get()
  async findAll(): Promise<DataRes<ExpenseCategory[]>> {
    const expenseCategory = await this.expenseCategoryService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: expenseCategory,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const expenseCategory = await this.expenseCategoryService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: expenseCategory,
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExpenseCategoryDto: UpdateExpenseCategoryDto,
  ) {
    return this.expenseCategoryService.update(+id, updateExpenseCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseCategoryService.remove(+id);
  }
}
