import { FeatureAccess } from '../access-control/access-control.model';

export interface Role {
  id: number;
  name: string;
  description: string;
  systemDefine: boolean;
  permissions: any[];
}

export interface RoleRequest {
  id?: number;
  name: string;
  description: string;
  permissions: FeatureAccess[];
}

export interface RoleResponse {
  data: Role;
  message: string;
  statusCode: number;
}
