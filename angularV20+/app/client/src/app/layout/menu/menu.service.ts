import { computed, Injectable, signal, WritableSignal } from "@angular/core";
import { IMenuItem } from "./menu.model";
import { MenuConstant } from "@layout/menu/menu-items";


@Injectable({
    providedIn: "root"
})
export class MenuService {
    private menu: WritableSignal<IMenuItem[]> = signal<IMenuItem[]>(
        [
            MenuConstant.MENU_ITEMS["dashboard"],
            MenuConstant.MENU_ITEMS["test"],
            MenuConstant.MENU_ITEMS["test2"],
            MenuConstant.MENU_ITEMS["expenses"],
            MenuConstant.MENU_ITEMS["user"],
            MenuConstant.MENU_ITEMS["preferences"]
        ]
    );

    /** Lấy toàn bộ menu */
    getAll() {
        return computed(() => this.menu());
    }

    /** Thay đổi menu (reactive) */
    change() {
        return computed(() => this.menu());
    }

    /** Set menu mới */
    set(menu: IMenuItem[]) {
        this.menu.set(menu);
        return computed(() => this.menu());
    }

    /** Thêm 1 item vào menu */
    add(menuItem: IMenuItem) {
        this.menu.update(curr => [...curr, menuItem]);
    }

    /** Build route từ mảng string */
    buildRoute(routeArr: string[]): string {
        return routeArr
            .filter(item => item && item.trim())
            .map(item => `/${item.replace(/^\/+|\/+$/g, "")}`)
            .join("");
    }

    /** Reset menu */
    reset() {
        this.menu.set([]);
    }

    /** Lấy level của route để generate breadcrumb */
    getLevel(routeArr: string[]): string[] {
        const tmpArr: string[] = [];

        const traverse = (data: IMenuItem[]) => {
            data.forEach(item => {
                if (item.route && routeArr.includes(item.route)) {
                    tmpArr.push(item.name);
                    if (item.child && item.child.length) {
                        traverse(item.child);
                    }
                }
            });
        };

        traverse(this.menu());
        return tmpArr;
    }
}
