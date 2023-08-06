import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, share } from "rxjs";
import { IMenuItem } from "./menu.model";
import { forEach } from "lodash";
import { isEmptyArray } from "@shared/helpers";


@Injectable({
    providedIn: "root"
})
export class MenuService {
    private menu$: BehaviorSubject<IMenuItem[]> = new BehaviorSubject<
            IMenuItem[]
    >([]);

    getAll(): Observable<IMenuItem[]> {
        return this.menu$.asObservable();
    }

    change(): Observable<IMenuItem[]> {
        return this.menu$.pipe(share());
    }

    set(menu: IMenuItem[]): Observable<IMenuItem[]> {
        this.menu$.next(menu);
        return this.menu$.asObservable();
    }

    add(menu: IMenuItem) {
        const tmpMenu = this.menu$.value;
        tmpMenu.push(menu);
        this.menu$.next(tmpMenu);
    }

    buildRoute(routeArr: string[]): string {
        let route = "";
        routeArr.forEach((item) => {
            if (item && item.trim()) {
                route += "/" + item.replace(/^\/+|\/+$/g, "");
            }
        });
        return route;
    }

    /** Reset the menu data. */
    reset() {
        this.menu$.next([]);
    }

    /** Get the menu level generate breadcrumb. */
    getLevel(routeArr: string[]): string[] {
        let tmpArr: any[] = [];
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
        traverse(this.menu$.value);
        return tmpArr;
    }
}
