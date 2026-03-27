import { Component, Input, OnInit, signal } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { IMenuChildrenItem, IMenuItem } from "@layout/menu/menu.model";
import { NgStyle, NgTemplateOutlet } from "@angular/common";
import { CommonService } from "@shared/helpers/common.service";
import { MatAccordion, MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-sidebar-item",
    imports: [
        TranslatePipe,
        NgStyle,
        MatAccordion, MatExpansionModule, MatFormFieldModule, MatInputModule, MatIconModule, NgTemplateOutlet
    ],
    templateUrl: "./sidebar-item.html",
    styleUrl: "./sidebar-item.scss",
    standalone: true,
})
export class SidebarItem implements OnInit {
    @Input() item!: IMenuChildrenItem[] | undefined;
    @Input() depth = 0;

    openMap = signal<Map<number | string, boolean>>(new Map());

    constructor(public helpers: CommonService) {
        // console.log(this.item);
    }

    ngOnInit() {
        // console.log(this.item);
    }

    expandSubmenu(item: IMenuItem) {
        console.log(item);
    }

    toggleSubmenu(item: any) {
        const map = new Map(this.openMap());
        map.set(item.id, !map.get(item.id));
        this.openMap.set(map);
    }

    // Kiểm tra trạng thái mở
    isOpen(item: any) {
        return this.openMap().get(item.id) === true;
    }

    goto(route: string) {
        console.log('Navigate to', route);
        // dùng Router.navigate nếu muốn chuyển route
    }
}
