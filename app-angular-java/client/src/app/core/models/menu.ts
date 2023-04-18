export interface Menu {
    id: number;
    type: 'link' | 'sub' | 'extLink' | 'extTabLink';
    name: string;
    icon: string;
    route: string;
    child?: MenuChildrenItem[];
    permissions?: MenuPermissions
}

export interface MenuChildrenItem {
    id: number;
    route: string;
    name: string;
    type: 'link' | 'sub' | 'extLink' | 'extTabLink';
    child?: MenuChildrenItem[];
    permissions?: MenuPermissions;
}

export interface MenuPermissions {
    only?: string | string[];
    except?: string | string[];
}