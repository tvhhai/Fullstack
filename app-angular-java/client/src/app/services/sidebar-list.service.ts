import {Injectable} from '@angular/core';
import {SidebarItem} from "../models/sidebar-item";

@Injectable({
    providedIn: 'root'
})
export class SidebarListService {

    sidebarItems: SidebarItem[] = [
        {
            id: 1,
            name: 'Dashboard',
            icon: 'dashboard',
            route: '/dashboard',
        },
        {
            id: 2,
            name: 'Customers',
            icon: 'people',
            route: '/test1',
            child: [
                {
                    id: 2,
                    name: 'Customers',
                    icon: 'people',
                    route: '/test1',
                },
                {
                    id: 2,
                    name: 'Customers',
                    icon: 'people',
                    route: '/test1',
                }
            ]
        },
        {
            id: 3,
            name: 'Orders',
            icon: 'shopping_cart',
            route: '/test2',
            child: [
                {
                    id: 2,
                    name: 'Customers',
                    icon: 'people',
                    route: '/test1',
                },
                {
                    id: 2,
                    name: 'Customers',
                    icon: 'people',
                    route: '/test1',
                    child: [
                        {
                            id: 2,
                            name: 'Customers',
                            icon: 'people',
                            route: '/test1',
                        },
                        {
                            id: 2,
                            name: 'Customers',
                            icon: 'people',
                            route: '/test1',
                        }
                    ]
                }
            ]
        },
        {
            id: 4,
            name: 'Settings',
            icon: 'settings',
            route: '/settings',
        }
    ];

    constructor() {
    }

    getSidebarItems(): SidebarItem[] {
        return this.sidebarItems;
    }
}
