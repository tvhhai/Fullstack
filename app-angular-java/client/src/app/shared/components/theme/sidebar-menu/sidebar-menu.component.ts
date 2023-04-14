import { SidebarListService } from 'src/app/services/sidebar-list.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent {
  @Input() ripple = false;

  menu$ = this.menu.getAll();

  buildRoute = this.menu.buildRoute;

  ngOnInit() {
    console.log(this.menu.getAll())
  }

  constructor(private menu: SidebarListService) {}
}
