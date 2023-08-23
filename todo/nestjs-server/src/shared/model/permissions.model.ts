import { EPermission } from '@features/rbac/permissions/enum/permission.enum';

export interface IPermissions {
  feature: string;
  accessList: EPermission[];
}
