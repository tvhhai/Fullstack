import { Module } from '@nestjs/common';
import { TableSettingsService } from './table-settings.service';
import { TableSettingsController } from './table-settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableSetting } from './entities/table-setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TableSetting])],
  controllers: [TableSettingsController],
  providers: [TableSettingsService],
  exports: [TableSettingsService],
})
export class TableSettingsModule {}
