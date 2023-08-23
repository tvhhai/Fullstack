import { IsNotEmpty } from 'class-validator';
import { IPermissions } from '@shared/model/permissions.model';

export class CreateRoleDto {
  @IsNotEmpty()
  name: string;
  description: string;
  systemDefine: boolean;
  permissions: IPermissions[];
}
