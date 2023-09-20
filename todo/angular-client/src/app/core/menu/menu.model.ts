export interface IMenuItem {
  id: number | string;
  type: 'section' | 'link' | 'sub' | 'extLink' | 'extTabLink';
  name: string;
  icon?: string;
  route: string;
  child?: IMenuChildrenItem[];
  permissions?: IMenuPermissions;
  color?: string
}

export interface IMenuChildrenItem extends IMenuItem{
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
}

export interface IMenuPermissions {
  only?: string | string[];
  except?: string | string[];
}
