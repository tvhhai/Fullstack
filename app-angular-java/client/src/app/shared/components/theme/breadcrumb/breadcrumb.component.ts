import {Component, Input} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {SidebarListService} from "../../../../services/sidebar-list.service";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input() nav: string[] = [];

  constructor(private router: Router, private menu: SidebarListService) {
    this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => this.genBreadcrumb());
  }

  ngOnInit() {
    this.nav = Array.isArray(this.nav) ? this.nav : [];

    if (this.nav.length === 0) {
      this.genBreadcrumb();
    }
  }

  trackByNavlink(index: number, navLink: string): string {
    return navLink;
  }

  genBreadcrumb() {
    const routes = this.router.url.slice(1).split('/');
    this.nav = this.menu.getLevel(routes);
    this.nav.unshift('home');
    console.log(this.nav);
    
  }
}
