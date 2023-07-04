import { EPermission } from 'src/features/permissions/enum/permission.enum';
import { IPermissions } from '../model/permissions.model';

export const ROLE_ADMIN: IPermissions[] = [
  {
    feature: 'user',
    accessList: [EPermission.ADD, EPermission.EDIT, EPermission.DELETE],
  },
  {
    feature: 'setting',
    accessList: [EPermission.READ, EPermission.WRITE],
  },
];

export const ROLE_USER: IPermissions[] = [
  {
    feature: 'user',
    accessList: [EPermission.ADD],
  },
  {
    feature: 'setting',
    accessList: [EPermission.READ],
  },
];
export const ROLE_MOD: IPermissions[] = [
  {
    feature: 'user',
    accessList: [EPermission.ADD, EPermission.EDIT, EPermission.DELETE],
  },
  {
    feature: 'setting',
    accessList: [EPermission.READ, EPermission.WRITE],
  },
];
