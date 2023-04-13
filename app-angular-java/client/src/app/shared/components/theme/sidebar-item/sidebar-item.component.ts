import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarItemComponent {
  @Input() data!: any;
  @Input() index!: number;
  @Input() level!: number;

  open: boolean = false;

  openDropdown() {
    this.open = !this.open;
  }
  closeDropdown() {
    this.open = false;
  }
}
