import {Component, Input} from '@angular/core';
import {SidebarItem} from "../../../models/sidebar-item";

@Component({
    selector: 'app-sidebar-item',
    templateUrl: './sidebar-item.component.html',
    styleUrls: ['./sidebar-item.component.scss']
})
export class SidebarItemComponent {
    // Note: Ripple effect make page flashing on mobile
    @Input() data!: any;

    // menu$ = this.menu.getAll();
    //
    // buildRoute = this.menu.buildRoute;

    // constructor(private menu: MenuService) {}
    open: boolean = false;

    openDropdown() {
        console.log('kkkk');
        this.open = !this.open;
    }
}
