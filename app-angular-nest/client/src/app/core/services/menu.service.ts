import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, share } from 'rxjs';
import { IMenuSection, IMenuItem } from '../models/menu';

type MenuEntry = IMenuSection | IMenuItem;

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menu$: BehaviorSubject<MenuEntry[]> = new BehaviorSubject<
    MenuEntry[]
  >([]);

  getAll(): Observable<MenuEntry[]> {
    return this.menu$.asObservable();
  }

  change(): Observable<MenuEntry[]> {
    return this.menu$.pipe(share());
  }

  set(menu: MenuEntry[]): Observable<MenuEntry[]> {
    this.menu$.next(menu);
    return this.menu$.asObservable();
  }

  add(menu: MenuEntry) {
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
  private isLeafItem(item: MenuEntry): boolean {
    item = item as IMenuItem;
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

  private isRouteEqual(
    routeArr: Array<string> | string,
    realRouteArr: Array<string>
  ): boolean {
    realRouteArr = this.deepClone(realRouteArr);
    realRouteArr = realRouteArr.filter((r) => r !== '');
    return this.isJsonObjEqual(routeArr, realRouteArr);
  }

  /** Get the menu level generate breadcrumb. */
  getLevel(routeArr: string[]): string[] {
    // TODO: refactor
    let tmpArr: any[] = [];

    const traverse = (
      item: any,
      parentNamePathList: string[],
      realRouteArr: string[]
    ) => {
      if (item.apps) {
        item.apps.forEach((val: any) => {
          const eachItem = val;
          const currentNamePathList = [...parentNamePathList, eachItem.name];
          const currentRealRouteArr = [...realRouteArr, eachItem.route];
          // Compare the full Array for expandable
          if (this.isRouteEqual(routeArr, currentRealRouteArr)) {
            tmpArr = currentNamePathList;
            return;
          }
          if (!this.isLeafItem(eachItem)) {
            eachItem.child?.forEach((child: any) =>
              traverse(child, currentNamePathList, currentRealRouteArr)
            );
          }
        });
      } else {
        const currentNamePathList = [...parentNamePathList, item.name];
        const currentRealRouteArr = [...realRouteArr, item?.route];
        // Compare the full Array for expandable
        if (this.isRouteEqual(routeArr, currentRealRouteArr)) {
          tmpArr = currentNamePathList;
          return;
        }
        if (!this.isLeafItem(item)) {
          item.child?.forEach((child: any) =>
            traverse(child, currentNamePathList, currentRealRouteArr)
          );
        }
      }
    };

    this.menu$.value.forEach((item) => {
      traverse(item, [], []);
    });
    console.log(tmpArr)
    return tmpArr;
  }
}
