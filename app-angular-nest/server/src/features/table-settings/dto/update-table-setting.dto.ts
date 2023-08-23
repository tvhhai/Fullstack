import { PartialType } from '@nestjs/mapped-types';
import { CreateTableSettingDto } from './create-table-setting.dto';

export class UpdateTableSettingDto extends PartialType(CreateTableSettingDto) {}
