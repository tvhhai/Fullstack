import { ViewEncapsulation, Component, OnInit } from '@angular/core';
import { MenuService } from '@core/menu/menu.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-sidebar-menu',
  styleUrls: ['./sidebar-menu.component.scss'],
  templateUrl: './sidebar-menu.component.html',
})
export class SidebarMenuComponent implements OnInit {
  menu$ = this.menu.getAll();

  buildRoute = this.menu.buildRoute;

  ngOnInit() {
    // console.log(this.menu$);
    console.log();
  }

  constructor(private menu: MenuService) {}
}
