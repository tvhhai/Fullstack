import {
    ChangeDetectorRef,
    AfterViewInit,
    Component,
    ViewChild,
    OnInit,
} from '@angular/core';
import { PreSettingService } from '@core/bootstrap/presetting.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-admin-layout',
    styleUrls: ['./admin-layout.component.scss'],
    templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent implements AfterViewInit, OnInit {
    @ViewChild(MatSidenav)
    sidenav!: MatSidenav;
    opened!: boolean;
    settings = this.preSettingService.getDataPreSetting();

    constructor(
        private breakpointObserver: BreakpointObserver,
        private preSettingService: PreSettingService,
        private translate: TranslateService,
        private cdr: ChangeDetectorRef
    ) {
        this.settings.subscribe({
            next: data => {
                this.translate.use(data.language);
            },
        });
    }

    ngOnInit() {
        console.log();
    }

    ngAfterViewInit() {
        this.breakpointObserver
            .observe(['(max-width: 800px)'])
            .subscribe(res => {
                if (res.matches) {
                    if (this.sidenav.mode !== 'over') {
                        this.sidenav.close();
                        this.sidenav.mode = 'over';
                    }
                } else {
                    if (this.sidenav.mode !== 'side') {
                        this.sidenav.open();
                        this.sidenav.mode = 'side';
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
