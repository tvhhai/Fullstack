import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    effect,
    OnDestroy,
    OnInit,
    runInInjectionContext,
    ViewChild
} from "@angular/core";
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from "@angular/material/sidenav";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Sidebar } from "../sidebar/sidebar";
import { Header } from "../header/header";
import { RouterOutlet } from "@angular/router";
import { Settings } from "../../../bootstrap/settings";
import { Subscription } from "rxjs";
// import { PreSettingService } from "@core/bootstrap/presetting.service";
// import { TranslateService } from "@ngx-translate/core";
// import { IMenuItem } from "@core/menu/menu.model";

@Component({
    selector: "app-admin-layout",
    imports: [
        MatSidenavModule,
        MatSidenavContainer,
        Sidebar,
        Header,
        RouterOutlet
    ],
    templateUrl: "./admin-layout.html",
    styleUrl: "./admin-layout.scss",
    standalone: true
})
export class AdminLayout implements OnInit, AfterViewInit {
    @ViewChild(MatSidenav) sidenav!: MatSidenav;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private settings: Settings,
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.breakpointObserver.observe(["(max-width: 800px)"]).subscribe((res) => {
            if (res.matches) {
                if (this.sidenav.mode !== "over") {
                    this.sidenav.mode = "over";
                    Promise.resolve().then(() => this.sidenav.close());
                    this.settings.toggleSidebar(false);
                }
            } else {
                if (this.sidenav.mode !== "side") {
                    this.sidenav.mode = "side";
                    Promise.resolve().then(() => this.sidenav.open());
                    this.settings.toggleSidebar(true);
                }
            }
            this.cdr.detectChanges();
        });
        const setting = this.settings.settings();
        Promise.resolve().then(() => this.setStateSidebar(setting.sidebarOpen));
    }

    async toggleSideNav() {
        await this.sidenav.toggle();
        this.settings.toggleSidebar(undefined);
    }

    async setStateSidebar(state: boolean) {
        state ? await this.sidenav.open() : await this.sidenav.close();
    }

    onBackdropClick() {
        this.settings.toggleSidebar(false);
    }
}
