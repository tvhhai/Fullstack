import { IsNotEmpty } from 'class-validator';
import { User } from '../../rbac/users/entities/user.entity';

export class CreateTableSettingDto {
  @IsNotEmpty()
  tableId: string;

  @IsNotEmpty()
  tableConfig: string;

  user: User;
}
