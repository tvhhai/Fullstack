import {Injectable} from '@angular/core';
import {SidebarItem} from "../models/sidebar-item";
import {BehaviorSubject, Observable, share} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class SidebarListService {
    sidebarItems: SidebarItem[] = [
        {
            id: 1,
            name: 'Dashboard',
            icon: 'dashboard',
            route: 'dashboard',
            type: 'link',
        },
        {
            id: 2,
            name: 'Customers',
            icon: 'people',
            route: 'customers',
            type: 'sub',
            child: [
                {
                    id: 2,
                    name: 'Customers add',
                    route: 'test2',
                    type: 'link',
                },
                {
                    id: 2,
                    name: 'Customers edit',
                    route: 'test1',
                    type: 'link',
                },
            ],
        },
        {
            id: 3,
            name: 'Orders',
            icon: 'shopping_cart',
            route: '',
            type: 'sub',
            child: [
                {
                    id: 5,
                    name: 'level 2',
                    route: 'test3',
                    type: 'link',
                },
                {
                    id: 6,
                    name: 'level 2',
                    route: '',
                    type: 'sub',
                    child: [
                        {
                            id: 7,
                            name: 'level 3',
                            route: 'test4',
                            type: 'link',
                        },
                        {
                            id: 8,
                            name: 'level 3',
                            route: '',
                            type: 'sub',
                            child: [
                                {
                                    id: 9,
                                    name: 'level 4',
                                    route: 'test5',
                                    type: 'link',
                                },
                                {
                                    id: 10,
                                    name: 'level 4',
                                    route: 'test7',
                                    type: 'link',
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 6,
                    name: 'level 2',
                    route: '',
                    type: 'sub',
                    child: [
                        {
                            id: 7,
                            name: 'level 3',
                            route: 'test7',
                            type: 'link',
                        },
                        {
                            id: 8,
                            name: 'level 3',
                            route: '',
                            type: 'sub',
                            child: [
                                {
                                    id: 9,
                                    name: 'level 4',
                                    route: 'test8',
                                    type: 'link',
                                },
                                {
                                    id: 10,
                                    name: 'level 4',
                                    route: 'test9',
                                    type: 'link',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 4,
            name: 'Settings',
            icon: 'settings',
            route: 'test10',
            type: 'link',
        },
    ];

    private menu$: BehaviorSubject<SidebarItem[]> = new BehaviorSubject<SidebarItem[]>(this.sidebarItems);

    constructor() {
        console.log(this.menu$);
    }

    getSidebarItems(): SidebarItem[] {
        return this.sidebarItems;
    }

    getAll(): Observable<SidebarItem[]> {
        return this.menu$.asObservable();
    }

    change(): Observable<SidebarItem[]> {
        return this.menu$.pipe(share());
    }

    add(menu: SidebarItem) {
        const tmpMenu = this.menu$.value;
        tmpMenu.push(menu);
        this.menu$.next(tmpMenu);
    }

    buildRoute(routeArr: string[]): string {
        let route = '';
        routeArr.forEach((item) => {
            if (item && item.trim()) {
                route += '/' + item.replace(/^\/+|\/+$/g, '');
            }
        });
        return route;
    }

    /** Reset the menu data. */
    reset() {
        this.menu$.next([]);
    }

    // Whether is a leaf menu
    private isLeafItem(item: SidebarItem): boolean {
        const cond0 = item.route === undefined;
        const cond1 = item.child === undefined;
        const cond2 = !cond1 && item.child?.length === 0;
        return cond0 || cond1 || cond2;
    }

    // Deep clone object could be jsonized
    private deepClone(obj: any): any {
        return JSON.parse(JSON.stringify(obj));
    }

    // Whether two objects could be jsonized equal
    private isJsonObjEqual(obj0: any, obj1: any): boolean {
        return JSON.stringify(obj0) === JSON.stringify(obj1);
    }

    private isRouteEqual(routeArr: Array<string> | string, realRouteArr: Array<string>): boolean {
        realRouteArr = this.deepClone(realRouteArr);
        realRouteArr = realRouteArr.filter(r => r !== '');
        return this.isJsonObjEqual(routeArr, realRouteArr);
    }

    /** Get the menu level. */
    getLevel(routeArr: string[]): string[] {
        let tmpArr: any[] = [];
        this.menu$.value.forEach(item => {
            // Breadth-first traverse
            let unhandledLayer = [{item, parentNamePathList: [], realRouteArr: []}];
            while (unhandledLayer.length > 0) {
                let nextUnhandledLayer: any[] = [];
                for (const ele of unhandledLayer) {
                    const eachItem = ele.item;
                    const currentNamePathList = this.deepClone(ele.parentNamePathList).concat(eachItem.name);
                    const currentRealRouteArr = this.deepClone(ele.realRouteArr).concat(eachItem.route);
                    // Compare the full Array for expandable
                    if (this.isRouteEqual(routeArr, currentRealRouteArr)) {
                        tmpArr = currentNamePathList;
                        break;
                    }
                    if (!this.isLeafItem(eachItem)) {
                        const wrappedChildren = eachItem.child?.map(child => ({
                            item: child,
                            parentNamePathList: currentNamePathList,
                            realRouteArr: currentRealRouteArr,
                        }));
                        nextUnhandledLayer = nextUnhandledLayer.concat(wrappedChildren);
                    }
                }
                unhandledLayer = nextUnhandledLayer;
            }
        });
        return tmpArr;
    }
}