import { ViewEncapsulation, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuService } from '@core/menu/menu.service';
import { isEmptyArray } from '@shared/helpers';
import { filter } from 'rxjs/operators';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-breadcrumb',
  styleUrls: ['./breadcrumb.component.scss'],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnInit {
  nav: string[] = [];

  constructor(
    private router: Router,
    private menu: MenuService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.genBreadcrumb());
  }

  ngOnInit() {
    this.nav = Array.isArray(this.nav) ? this.nav : [];

    if (isEmptyArray(this.nav)) {
      this.genBreadcrumb();
    }
  }

  genBreadcrumb() {
    const routes = this.router.url.slice(1).split('/');
    this.nav = this.menu.getLevel(routes);

    if (this.nav.includes('common.dashboard') && this.nav.length === 1) {
      this.nav = ['common.home'];
    } else {
      this.nav.unshift('common.home');
    }
  }
}
