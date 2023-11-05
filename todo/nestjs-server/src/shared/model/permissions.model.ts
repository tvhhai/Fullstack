import { EPermission } from '@features/rbac/permissions/enum/permission.enum';
import { COOKIE_NAME } from '@shared/constants/common.constant';

export interface IPermissions {
  feature: string;
  accessList: EPermission[];
}

export interface IToken {
  [COOKIE_NAME]: { accessToken: string, refreshToken: string }
}