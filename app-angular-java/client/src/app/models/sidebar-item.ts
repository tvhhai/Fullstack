export interface SidebarItem {
    id: number;
    name: string;
    icon: string;
    route: string;
    child?: Array<any>;
}
