import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, share} from "rxjs";
import {MENU_ITEMS} from "../constants/menu-items";
import {Menu} from "../models/menu";




@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menu$: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);

  constructor() {
    this.menu$.next(MENU_ITEMS);
  }

  getAll(): Observable<Menu[]> {
    return this.menu$.asObservable();
  }

  change(): Observable<Menu[]> {
    return this.menu$.pipe(share());
  }

  add(menu: Menu) {
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
  private isLeafItem(item: Menu): boolean {
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
