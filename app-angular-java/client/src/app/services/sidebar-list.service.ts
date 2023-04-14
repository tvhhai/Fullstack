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
          name: 'Customers',
          route: 'test2',
          type: 'link',
        },
        {
          id: 2,
          name: 'Customers',
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

  private menu$: BehaviorSubject<SidebarItem[]> = new BehaviorSubject<
    SidebarItem[]
  >(this.sidebarItems);

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
}