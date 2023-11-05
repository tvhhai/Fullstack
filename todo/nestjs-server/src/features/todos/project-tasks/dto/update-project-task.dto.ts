import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectTaskDto } from './create-project-task.dto';
import { ViewState } from '@features/todos/project-tasks/enum/project-tasks.enum';
import { User } from '@features/rbac/users/entities/user.entity';

export class UpdateProjectTaskDto extends PartialType(CreateProjectTaskDto) {
  title: string;

  color: string;

  view: ViewState;

  user: User;
}
