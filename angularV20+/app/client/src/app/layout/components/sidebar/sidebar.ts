import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
} from "@angular/core";
import { SidebarItem } from "@layout/components/sidebar-item/sidebar-item";
import { MenuService } from "@layout/menu/menu.service";
import { IMenuItem } from "@layout/menu/menu.model";
import { RouterLink } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";


@Component({
    selector: "app-sidebar",
    imports: [
        SidebarItem,
        RouterLink,
        TranslatePipe
    ],
    templateUrl: "./sidebar.html",
    styleUrl: "./sidebar.scss",
    standalone: true,
})
export class Sidebar implements AfterViewInit {
    sidebarItems: IMenuItem[] = [];

    constructor(private menu: MenuService) {
        this.getMenu();
    }

    ngOnInit() {
        // console.log(this.sidebarItems);
    }

    ngAfterViewInit() {
    }

    getMenu() {
        const menuSignal = this.menu.getAll();
        this.sidebarItems = menuSignal();
    }

}
