import { EPermission } from 'src/features/permissions/enum/permission.enum';

export interface IPermissions {
  feature: string;
  accessList: EPermission[];
}
