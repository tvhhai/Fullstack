import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from "@angular/material/sidenav";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Sidebar } from "../sidebar/sidebar";
import { Header } from "../header/header";
import { RouterOutlet } from "@angular/router";
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
export class AdminLayout implements AfterViewInit {
    @ViewChild(MatSidenav)
    sidenav!: MatSidenav;
    opened!: boolean;

    // settings = this.preSettingService.getDataPreSetting();

    constructor(
        private breakpointObserver: BreakpointObserver,
        // private preSettingService: PreSettingService,
        // private translate: TranslateService,
        private cdr: ChangeDetectorRef
    ) {
        // this.settings.subscribe({
        //     next: (data: any) => {
        // this.translate.use(data.language);
        // }
        // });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.breakpointObserver.observe(["(max-width: 800px)"]).subscribe((res) => {
            if (res.matches) {
                if (this.sidenav.mode !== "over") {
                    this.sidenav.close();
                    this.sidenav.mode = "over";
                }
            } else {
                if (this.sidenav.mode !== "side") {
                    this.sidenav.open();
                    this.sidenav.mode = "side";
                }
            }
            this.setIsOpenSidebar(this.sidenav.opened);
            this.cdr.detectChanges();
        });
    }

    toggleSideNav() {
        this.sidenav.toggle();
        this.setIsOpenSidebar(this.sidenav.opened);
    }

    setIsOpenSidebar(opened: boolean) {
        this.opened = opened;
    }

    // toggleDarkTheme(options: AppSettings) {
    //   if (options.theme === 'dark') {
    //     this.htmlElement.classList.add('theme-dark');
    //   } else {
    //     this.htmlElement.classList.remove('theme-dark');
    //   }
    // }
}
