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
            route: 'dashboard',
        },
        {
            id: 2,
            name: 'Customers',
            icon: 'people',
            route: 'test2',
            child: [
                {
                    id: 2,
                    name: 'Customers',
                    route: 'test2',
                },
                {
                    id: 2,
                    name: 'Customers',
                    route: 'test1',
                }
            ]
        },
        {
            id: 3,
            name: 'Orders',
            icon: 'shopping_cart',
            route: 'test2',
            child: [
                {
                    id: 5,
                    name: 'level 2',
                    route: 'test1',
                },
                {
                    id: 6,
                    name: 'level 2',
                    route: 'test1',
                    child: [
                        {
                            id: 7,
                            name: 'level 3',
                            route: 'test1',
                        },
                        {
                            id: 8,
                            name: 'level 3',
                            route: 'test1',
                            child: [
                                {
                                    id: 9,
                                    name: 'level 4',
                                    route: 'test1',
                                },
                                {
                                    id: 10,
                                    name: 'level 4',
                                    route: 'test1',
                                },
                            ]
                        }
                    ]
                },
                {
                    id: 6,
                    name: 'level 2',
                    route: 'test1',
                    child: [
                        {
                            id: 7,
                            name: 'level 3',
                            route: 'test1',
                        },
                        {
                            id: 8,
                            name: 'level 3',
                            route: 'test1',
                            child: [
                                {
                                    id: 9,
                                    name: 'level 4',
                                    route: 'test1',
                                },
                                {
                                    id: 10,
                                    name: 'level 4',
                                    route: 'test1',
                                },
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 4,
            name: 'Settings',
            icon: 'settings',
            route: 'test2',
        }
    ];

    constructor() {
    }

    getSidebarItems(): SidebarItem[] {
        return this.sidebarItems;
    }
}
