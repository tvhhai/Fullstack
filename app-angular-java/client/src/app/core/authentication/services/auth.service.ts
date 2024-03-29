import {Injectable, Injector} from '@angular/core';
import {BehaviorSubject, finalize, iif, noop, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {
    AppConstant

} from "../../constants/app.constant";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {LoaderService} from "../../../shared/services/loader.service";
import {MenuConstant} from "../../constants/menu-items";
import {UserResponse} from "../models/auth";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    redirectUrl: any;

    constructor(private http: HttpClient, private router: Router, private injector: Injector, private loaderService: LoaderService) {
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post(AppConstant.API.SIGN_IN_API, {username, password}).pipe(
            map(() => {


                if (this.redirectUrl) {
                    // this.router.navigate([this.redirectUrl]);
                    window.location.href = this.redirectUrl
                    this.redirectUrl = null;
                } else {
                    // this.router.navigate([`${AppConstant.PAGE.DASHBOARD_PAGE}`]);
                    window.location.href = AppConstant.PAGE.DASHBOARD_PAGE
                }
                // const afterLoginService = this.injector.get(StartupService);
                // const appInitializer = StartupServiceFactory(afterLoginService)
                // appInitializer().then(() => noop());
            })
        );
    }

    register(username: string, email: string, password: string): Observable<any> {
        return this.http.post(
            AppConstant.API.SIGN_UP_API,
            {
                username,
                email,
                password,
            }
        );
    }

    logout(): Observable<any> {
        this.loaderService.isLoading.next(true);

        return this.http.post(AppConstant.API.SIGN_OUT_API, {}).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }

    doesHttpOnlyCookieExist(cookieName: string) {
        let d = new Date();
        d.setTime(d.getTime() + (1000));
        let expires = "expires=" + d.toUTCString();

        document.cookie = cookieName + "=new_value;path=/;" + expires;
        return document.cookie.indexOf(cookieName + '=') == -1;
    }

    refreshToken() {
        return this.http.get(AppConstant.API.TOKEN_REFRESH_API);
    }

    isLoggedIn() {
        return this.doesHttpOnlyCookieExist('accessToken') && this.doesHttpOnlyCookieExist('refreshToken') ||  this.doesHttpOnlyCookieExist('auth-cookie');
    }

    isRefreshTokenExist() {
        return this.doesHttpOnlyCookieExist('refreshToken');
    }

    getCurrentUser() {
        return this.http.get<UserResponse>("api/current-user");
    }

    menu() {
        return iif(() => this.isLoggedIn(), this.getMenu(), of([]));
    }

    getMenu(): Observable<any> {
        return of([MenuConstant.MENU_ITEMS['dashboard'],
            MenuConstant.MENU_ITEMS['user'],
            MenuConstant.MENU_ITEMS['test']]
        );
    }

    test() {
        return this.http.get<any>('/api/test');
    }
}
