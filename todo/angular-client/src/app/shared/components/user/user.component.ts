import { UserService } from '@core/authentication/services/user.service';
import { AuthService } from '@core/authentication/services/auth.service';
import { ViewEncapsulation, Component, OnInit } from '@angular/core';
import { AppConstant } from '@shared/constants';
import { Router } from '@angular/router';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-user',
    styleUrls: ['./user.component.scss'],
    templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
    constructor(
        private user: UserService,
        private authService: AuthService,
        private router: Router
    ) {}

    user$ = this.user.get();

    ngOnInit() {
        // console.log(this.user$);
    }

    openDialogSetting(settingRoute: string) {
        const openSetting = `settings/${settingRoute}`;
        this.user.backToUrlAfterCloseSettingDialog = this.router.url;
        this.router.navigate([openSetting]);
    }

    logout() {
        this.authService.logout().subscribe(() => {
            this.router.navigate([`${AppConstant.PAGE.SIGN_IN_PAGE}`]);
        });
    }
}
