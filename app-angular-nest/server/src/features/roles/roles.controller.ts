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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/req/create-role.dto';
import { UpdateRoleDto } from './dto/req/update-role.dto';
import { Role } from 'src/features/roles/entities/role.entity';
import { DataRes } from 'src/shared/dto/res/data-res.dto';

@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async findAll(): Promise<DataRes<Role[]>> {
    const roles = await this.rolesService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: roles,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<DataRes<Role>> {
    const user = await this.rolesService.findById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: user,
    };
  }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    console.log(createRoleDto);

    return this.rolesService.create(createRoleDto);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.rolesService.update(id, updateRoleDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: role,
      };
    } catch (err) {}
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.rolesService.remove(id);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: [],
      };
    } catch (err) {}
  }

  @Post('delete-multi')
  async removeMulti(@Body() ids: string[]): Promise<DataRes<Role[]>> {
    try {
      await this.rolesService.removeMulti(ids);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: [],
      };
    } catch (err) {}
  }
}
