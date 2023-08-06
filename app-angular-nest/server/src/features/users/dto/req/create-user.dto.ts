import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from '../../../roles/entities/role.entity';

export class CreateUserDto {
  firstName?: string;

  lastName?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  roles: Role[];
}
