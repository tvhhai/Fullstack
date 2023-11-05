import { BehaviorSubject, Observable, share } from 'rxjs';
import { isEmptyArray } from '@shared/helpers';
import { Injectable } from '@angular/core';
import { forEach } from 'lodash';

import { IMenuItem } from './menu.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  // private menu$: BehaviorSubject<IMenuItem[]> = new BehaviorSubject<
  //         IMenuItem[]
  // >([]);

  private menuSubject: BehaviorSubject<IMenuItem[]> = new BehaviorSubject<
    IMenuItem[]
  >([]);

  public menu$: Observable<IMenuItem[]> = this.menuSubject.asObservable();

  getAll(): Observable<IMenuItem[]> {
    return this.menu$;
  }

  change(): Observable<IMenuItem[]> {
    return this.menu$.pipe(share());
  }

  set(menu: IMenuItem[]): Observable<IMenuItem[]> {
    this.menuSubject.next(menu);
    return this.menu$;
  }

  add(menu: IMenuItem) {
    const tmpMenu = this.menuSubject.value;
    tmpMenu.push(menu);
    this.menuSubject.next(tmpMenu);
  }

  buildRoute(routeArr: string[]): string {
    let route = '';
    routeArr.forEach(item => {
      if (item && item.trim()) {
        route += '/' + item.replace(/^\/+|\/+$/g, '');
      }
    });
    return route;
  }

  /** Reset the menu data. */
  // reset() {
  //     this.menuSubject.next([]);
  // }

  /** Get the menu level generate breadcrumb. */
  getLevel(routeArr: string[]): string[] {
    const tmpArr: any[] = [];
    const traverse = (data: IMenuItem[]) => {
      forEach(data, (item: IMenuItem) => {
        if (item.route && routeArr.includes(item.route)) {
          tmpArr.push(item.name);
          if (item.child && !isEmptyArray(item.child)) {
            traverse(item.child);
          }
        }
      });
    };
    traverse(this.menuSubject.value);
    return tmpArr;
  }
}
