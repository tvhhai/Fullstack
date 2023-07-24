import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/req/create-role.dto';
import { UpdateRoleDto } from './dto/req/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  create(roleData: Partial<CreateRoleDto>): Promise<Role> {
    return this.rolesRepository.save(roleData);
  }

  findAll() {
    return this.rolesRepository.find();
  }

  findById(id: number) {
    const role = this.rolesRepository.findOne({ where: { id } });
    if (!role) {
      throw new Error('User not found');
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.rolesRepository.findOne({
      where: {
        id,
      },
    });
    if (!role) {
      throw new Error('Role not found');
    }

    const updatedRole = {
      ...role,
      ...updateRoleDto,
    };
    return this.rolesRepository.save(updatedRole);
  }

  remove(id: number) {
    return this.rolesRepository.delete(id);
  }

  async removeMulti(ids: string[]) {
    await this.rolesRepository
      .createQueryBuilder()
      .delete()
      .where('id IN (:...ids)', { ids })
      .execute();
  }

  async count() {
    return this.rolesRepository.count();
  }
}
