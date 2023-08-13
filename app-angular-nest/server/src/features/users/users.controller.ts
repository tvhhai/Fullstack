import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { DataRes } from '../../shared/dto/res/data-res.dto';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/req/create-user.dto';
import { get } from 'lodash';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<DataRes<User[]>> {
    const users = await this.usersService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: users,
    };
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<DataRes<User>> {
    const user = await this.usersService.findById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: user,
    };
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<DataRes<User[]>> {
    try {
      const user = await this.usersService.create(createUserDto);
      const data = await this.usersService.assignUserRole(
        get(user, 'id'),
        createUserDto.roles,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: [data],
      };
    } catch (err) {}
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.update(+id, updateUserDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: user,
      };
    } catch (err) {}
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DataRes<User[]>> {
    try {
      await this.usersService.remove(+id);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: [],
      };
    } catch (err) {}
  }

  @Post('delete-multi')
  async removeMulti(@Body() ids: string[]): Promise<DataRes<User[]>> {
    try {
      await this.usersService.removeMulti(ids);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: [],
      };
    } catch (err) {}
  }
}
