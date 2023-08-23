import { Injectable } from '@nestjs/common';
import { CreateTableSettingDto } from './dto/create-table-setting.dto';
import { UpdateTableSettingDto } from './dto/update-table-setting.dto';
import { User } from '../rbac/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableSetting } from './entities/table-setting.entity';

@Injectable()
export class TableSettingsService {
  constructor(
    @InjectRepository(TableSetting)
    private readonly tableSettingRepository: Repository<TableSetting>,
  ) {}

  create(data: CreateTableSettingDto): Promise<TableSetting> {
    return this.tableSettingRepository.save(data);
  }

  findAll(user: User) {
    return this.tableSettingRepository.find({
      where: {
        user: { id: user.id },
      },
    });
  }

  findByTableId(user: User, tableId: string): Promise<TableSetting> {
    return this.tableSettingRepository.findOne({
      where: {
        user: { id: user.id },
        tableId,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} tableSetting`;
  }

  async update(tableId: string, user: User, data: UpdateTableSettingDto) {
    const tableSetting = await this.tableSettingRepository.findOne({
      where: {
        user: { id: user.id },
        tableId,
      },
    });

    const updatedUser = {
      ...tableSetting,
      ...data,
    };

    return this.tableSettingRepository.save(updatedUser);
  }

  remove(id: number) {
    return `This action removes a #${id} tableSetting`;
  }
}
