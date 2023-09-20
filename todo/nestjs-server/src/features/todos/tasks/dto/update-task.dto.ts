import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { Task } from '@features/todos/tasks/entities/task.entity';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

export class UpdateTaskIndexDto {
  tasks: Task[];
  projectTask?: number;
  sectionTask?: number;
}
