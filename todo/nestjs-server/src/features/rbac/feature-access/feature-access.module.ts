import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureAccessService } from './feature-access.service';
import { FeatureAccessController } from './feature-access.controller';
import { FeatureAccess } from './entities/feature-access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureAccess])],
  controllers: [FeatureAccessController],
  providers: [FeatureAccessService],
  exports: [FeatureAccessService],
})
export class FeatureAccessModule {}
