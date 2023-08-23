import { IsNotEmpty } from 'class-validator';
import { User } from '../../../rbac/users/entities/user.entity';

export class CreateProjectTaskDto {
  @IsNotEmpty()
  title: string;

  user: User;
}
