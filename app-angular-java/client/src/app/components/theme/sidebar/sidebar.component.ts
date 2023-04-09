import { MediaMatcher } from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {SidebarListService} from "../../../services/sidebar-list.service";
import {SidebarItem} from "../../../models/sidebar-item";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss', '../layout/layout.component.scss'],
})
export class SidebarComponent {
  @Input() showToggle = true;
  @Input() showUser = true;
  @Input() showHeader = true;
  @Input() toggleChecked = false;

  @Output() toggleCollapsed = new EventEmitter<void>();



  sidebarItems: SidebarItem[] | undefined;

  constructor(private sidebarService: SidebarListService) {
  }

  ngOnInit() {
    this.sidebarItems = this.sidebarService.getSidebarItems();
    console.log( this.sidebarItems )
  }
}
