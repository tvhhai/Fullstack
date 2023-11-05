export interface IMenuItem {
  id: number | string;
  child?: IMenuChildrenItem[];
  color?: string;
  countTask: number;
  icon?: string;
  name: string;
  permissions?: IMenuPermissions;
  route: string;
  type: 'section' | 'link' | 'sub';
}

export interface IMenuChildrenItem extends IMenuItem {
  childOfProject: boolean;
  countTask: number;
  type: 'link' | 'sub';
  view?: string;
}

export interface IMenuPermissions {
  except?: string[] | string;
  only?: string[] | string;
}
