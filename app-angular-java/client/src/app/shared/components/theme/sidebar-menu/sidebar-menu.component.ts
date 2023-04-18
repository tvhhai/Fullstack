import { Component, ViewEncapsulation } from '@angular/core';
import {MenuService} from "../../../../core/services/menu.service";

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarMenuComponent {

  menu$ = this.menu.getAll();

  buildRoute = this.menu.buildRoute;

  ngOnInit() {
    console.log(this.menu.getAll())
  }

  constructor(private menu: MenuService) {}
}
