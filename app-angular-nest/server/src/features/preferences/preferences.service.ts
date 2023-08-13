import { Injectable } from '@nestjs/common';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Preference } from './entities/preference.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { isDefined } from '../../helper';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectRepository(Preference)
    private readonly preferenceRepository: Repository<Preference>,
  ) {
  }

  async createDataDefault(data: CreatePreferenceDto, user: User) {
    if (Array.isArray(data)) {
      data.forEach((val) => {
        val.user = user;
      });
    }
    await this.preferenceRepository.insert(data);
  }

  async findAll(user: User) {
    const preferences = await this.preferenceRepository.find({
      where: { user: { id: user.id } },
    });

    const transformedPreferences: Record<string, any> = {};

    preferences.forEach((preference) => {
      if (preference.settingKey && isDefined(preference.settingValue)) {
        transformedPreferences[preference.settingKey] = preference.settingValue;
      }
    });

    return transformedPreferences;
  }

  findOne(id: number) {
    const preference = this.preferenceRepository.findOne({
      where: { id },
    });
    if (!preference) {
      throw new Error('Preference not found');
    }
    return preference;
  }

  async update(
    settingKey: string,
    user: User,
    dataUpdate: UpdatePreferenceDto,
  ) {
    const data = await this.preferenceRepository.findOne({
      where: { settingKey, user: { id: user.id } },
    });

    console.log('dataaa', data);

    if (!data) {
      dataUpdate.user = user;
      return this.preferenceRepository.save(dataUpdate);
    }

    const updatedPreference = {
      ...data,
      ...dataUpdate,
    };

    return this.preferenceRepository.save(updatedPreference);
  }

  remove(id: number) {
    return `This action removes a #${id} preference`;
  }
}
