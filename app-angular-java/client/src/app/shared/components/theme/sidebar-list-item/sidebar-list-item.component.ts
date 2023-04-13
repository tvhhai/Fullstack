import {Component, Input} from '@angular/core';
import {SidebarItem} from "../../../../models/sidebar-item";
import {NavigationEnd, Router} from "@angular/router";
import {SidebarListService} from "../../../../services/sidebar-list.service";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-sidebar-list-item',
  templateUrl: './sidebar-list-item.component.html',
  styleUrls: ['./sidebar-list-item.component.scss']
})
export class SidebarListItemComponent {
  sidebarItems!: SidebarItem[];
  @Input() data!: any;
  @Input() index!: number;
  @Input() level!: number;

  constructor(private router: Router, private sidebarService: SidebarListService) {
    // this.router.events
    //     .pipe(filter(event => event instanceof NavigationEnd))
    //     .subscribe(() => this.checkOpenLinks());

    // Fix opening status for async menu data
    // this.menu.change().subscribe(() => {
    //   setTimeout(() => this.checkOpenLinks());
    // });
  }
  ngOnInit() {
    this.sidebarItems = this.sidebarService.getSidebarItems();
    // console.log(this.sidebarItems);
  }

}
