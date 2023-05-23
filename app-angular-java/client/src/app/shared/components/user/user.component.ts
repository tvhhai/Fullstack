import {Component} from '@angular/core';
import {UserService} from "@core/authentication/services/user.service";
import {AppConstant} from "@core/constants/app.constant";
import {AuthService} from "@core/authentication/services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent {
    constructor(private user: UserService, private authService: AuthService, private router: Router) {
        // console.log(this.user-manager$)
    }

    user$ = this.user.get();

    logout() {
        this.authService.logout().subscribe(() => {
            this.router.navigate([`${AppConstant.PAGE.SIGN_IN_PAGE}`]);
        });
    }
}
