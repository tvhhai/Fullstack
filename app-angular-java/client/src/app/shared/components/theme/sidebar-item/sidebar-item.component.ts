import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
})
export class SidebarItemComponent {
  @Input() data!: any;

  open: boolean = false;

  openDropdown() {
    console.log('kkkk');
    this.open = !this.open;
  }
}
