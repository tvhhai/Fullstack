import { Component, ViewEncapsulation } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { MenuService } from "@core/menu/menu.service";
import { isEmptyArray } from "@shared/helpers";

@Component({
    selector: "app-breadcrumb",
    templateUrl: "./breadcrumb.component.html",
    styleUrls: ["./breadcrumb.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent {
    nav: string[] = [];

    constructor(private router: Router, private menu: MenuService) {
        this.router.events
                .pipe(filter((event) => event instanceof NavigationEnd))
                .subscribe(() => this.genBreadcrumb());
    }

    ngOnInit() {
        this.nav = Array.isArray(this.nav) ? this.nav:[];

        if (isEmptyArray(this.nav)) {
            this.genBreadcrumb();
        }
    }

    genBreadcrumb() {
        const routes = this.router.url.slice(1).split("/");
        this.nav = this.menu.getLevel(routes);

        if (this.nav.includes("common.dashboard") && this.nav.length===1) {
            this.nav = ["common.home"];
        } else {
            this.nav.unshift("common.home");
        }
    }
}
