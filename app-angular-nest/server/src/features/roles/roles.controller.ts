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

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    console.log(createRoleDto);

    return this.rolesService.create(createRoleDto);
  }

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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    // return this.rolesService.update(+id, updateRoleDto);

    try {
      const role = await this.rolesService.update(+id, updateRoleDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: role,
      };
    } catch (err) {}
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
