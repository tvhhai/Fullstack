import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/req/create-permission.dto';
import { UpdatePermissionDto } from './dto/req/update-permission.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';


@Injectable()
export class PermissionsService {
constructor(
  @InjectRepository(Permission)
  private readonly permissionsRepository: Repository<Permission>,) { }

  create(permissionData: Partial<Permission>): Promise<Permission> {
    return this.permissionsRepository.save(permissionData);
  }

  findAll() {
    return `This action returns all permissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }

  async count() {
    return this.permissionsRepository.count();
  }
}
