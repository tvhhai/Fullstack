import { EPermission } from 'src/features/permissions/enum/permission.enum';
import { IPermissions } from '../model/permissions.model';

export const ROLE_ADMIN: IPermissions[] = [
  {
    feature: 'user',
    accessList: [EPermission.READ, EPermission.WRITE],
  },
  {
    feature: 'setting',
    accessList: [EPermission.READ, EPermission.WRITE],
  },
];

export const ROLE_READ: IPermissions[] = [
  {
    feature: 'user',
    accessList: [EPermission.READ],
  },
  {
    feature: 'setting',
    accessList: [EPermission.READ],
  },
];

export const ROLE_WRITE: IPermissions[] = [
  {
    feature: 'user',
    accessList: [EPermission.READ],
  },
  {
    feature: 'setting',
    accessList: [EPermission.READ, EPermission.WRITE],
  },
];
