export interface IMenuSection {
    sectionId: number | string,
    sectionName: string,
    sectionType: true,
    apps?: IMenuItem[],
}

export interface IMenuItem {
    id: number | string;
    type: 'link' | 'sub' | 'extLink' | 'extTabLink';
    name: string;
    icon: string;
    route: string;
    child?: IMenuChildrenItem[];
    permissions?: IMenuPermissions
}

export interface IMenuChildrenItem {
    id: number | string;
    route: string;
    name: string;
    type: 'link' | 'sub' | 'extLink' | 'extTabLink';
    child?: IMenuChildrenItem[];
    permissions?: IMenuPermissions;
}

export interface IMenuPermissions {
    only?: string | string[];
    except?: string | string[];
}