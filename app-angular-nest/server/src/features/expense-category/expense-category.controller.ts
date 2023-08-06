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
  create(@Body() createExpenseCategoryDto: CreateExpenseCategoryDto) {
    return this.expenseCategoryService.create(createExpenseCategoryDto);
  }

  @Get()
  async findAll(): Promise<DataRes<ExpenseCategory[]>> {
    const expenseCategorys = await this.expenseCategoryService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: expenseCategorys,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseCategoryService.findOne(+id);
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
