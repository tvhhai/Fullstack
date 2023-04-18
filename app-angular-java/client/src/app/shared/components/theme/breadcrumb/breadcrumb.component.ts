import {Component, Input, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {MenuService} from "../../../../core/services/menu.service";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbComponent {
  @Input() nav: string[] = [];

  constructor(private router: Router, private menu: MenuService) {
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

  trackByNavLink(index: number, navLink: string): string {
    return navLink;
  }

  genBreadcrumb() {
    const routes = this.router.url.slice(1).split('/');
    this.nav = this.menu.getLevel(routes);
    this.nav.unshift('home');
    console.log(this.nav);
    
  }
}
