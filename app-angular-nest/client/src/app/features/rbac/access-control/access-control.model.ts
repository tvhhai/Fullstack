export enum EPermission {
  READ = 'read',
  WRITE = 'write',
  ADD = 'add',
  EDIT = 'edit',
  VIEW = 'view',
  DELETE = 'delete',
}

export interface FeatureAccess {
  accessListMapping: AccessMapping[];
  accessList: EPermission[];
  checkbox: AccessMapping;
  feature: string;
  id: number;
}

export interface FeatureAccessRequest {
  accessListMapping?: AccessMapping[];
  accessList: EPermission[];
  checkbox?: AccessMapping;
  feature: string;
  id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface AccessMapping {
  value: boolean;
  name: string;
  titleI18n?: string;
}

export interface SubHeaders {
  checkbox: AccessMapping;
  class: string;
  headerName: string;
}

export interface ControlHeaders {
  headerName: string;
  checkbox?: AccessMapping;
  rowspan?: number;
  colspan?: number;
  class?: string;
}

export interface AccessControl {
  [key: string]: AccessMapping[];
}

export interface MapAccessControl {
  [key: string]: AccessMapping;
}

export interface FeatureAccessResponse {
  data: FeatureAccess;
  message: string;
  statusCode: number;
}
