import { Injectable } from '@nestjs/common';
import { CreateFeatureAccessDto } from './dto/req/create-feature-access.dto';
import { UpdateFeatureAccessDto } from './dto/req/update-feature-access.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FeatureAccess } from './entities/feature-access.entity';

@Injectable()
export class FeatureAccessService {
  constructor(
    @InjectRepository(FeatureAccess)
    private readonly featureAccessRepository: Repository<FeatureAccess>,
  ) {}

  create(data: Partial<FeatureAccess>): Promise<FeatureAccess> {
    return this.featureAccessRepository.save(data);
  }

  findAll() {
    return this.featureAccessRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} featureAccess`;
  }

  update(id: number, updateFeatureAccessDto: UpdateFeatureAccessDto) {
    return `This action updates a #${id} featureAccess`;
  }

  remove(id: number) {
    return `This action removes a #${id} featureAccess`;
  }

  async count() {
    return this.featureAccessRepository.count();
  }
}
