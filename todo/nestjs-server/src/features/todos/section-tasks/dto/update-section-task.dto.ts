import { PartialType } from '@nestjs/mapped-types';
import { CreateSectionTaskDto } from './create-section-task.dto';

export class UpdateSectionTaskDto extends PartialType(CreateSectionTaskDto) {
}

export class UpdateSectionTaskTitleDto {
  title: string;
}
