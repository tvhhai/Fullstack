export interface SidebarItem {
  id: number;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  name: string;
  icon: string;
  route: string;
  child?: Array<any>;
  permissions?: MenuPermissions
}
export interface MenuPermissions {
  only?: string | string[];
  except?: string | string[];
}
