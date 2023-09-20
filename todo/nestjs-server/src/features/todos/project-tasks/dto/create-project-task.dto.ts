import { IsNotEmpty } from 'class-validator';
import { User } from '../../../rbac/users/entities/user.entity';
import { ViewState } from '@features/todos/project-tasks/enum/project-tasks.enum';

export class CreateProjectTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  view: ViewState;

  user: User;
}
