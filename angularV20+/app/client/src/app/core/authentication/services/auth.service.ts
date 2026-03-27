import { Injectable } from "@angular/core";
import { finalize, iif, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AppConstant } from "@shared/constants";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
// import { LoaderService } from "@shared/services/loader.service";
// import { MenuConstant } from "../../menu/menu-items";
import { UserResponse } from "../models/auth";
import { SettingConstant } from "@core/constants/auth.constant";
import { DataRes } from "@shared/model";
import { HttpService } from "@shared/services/http.service";
import { MenuConstant } from "@layout/menu/menu-items";
import { MenuService } from "@layout/menu/menu.service";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    redirectUrl: any;

    constructor(
        private http: HttpClient,
        private router: Router,
        private httpService: HttpService,
        private menuService: MenuService
        // private loaderService: LoaderService
    ) {
    }

    login(username: string, password: string): Observable<any> {
        return this.http
            .post(AppConstant.API.SIGN_IN_API, { username, password })
            .pipe(
                map(() => {
                    if (this.redirectUrl) {
                        this.router.navigate([this.redirectUrl]);
                        // window.location.href = this.redirectUrl;
                        // this.redirectUrl = null;
                    } else {
                        window.location.href = AppConstant.PAGE.DASHBOARD_PAGE;
                        // this.router.navigate([`${AppConstant.PAGE.DASHBOARD_PAGE}`]);
                    }
                    // const afterLoginService = this.injector.get(StartupService);
                    // const appInitializer = StartupServiceFactory(afterLoginService)
                    // appInitializer().then(() => noop());
                })
            );
    }

    register(username: string, email: string, password: string): Observable<any> {
        return this.http.post(AppConstant.API.SIGN_UP_API, {
            username,
            email,
            password
        });
    }

    getTokenExpiresIn(): Observable<DataRes<{ expiresIn: number }>> {
        return this.httpService.performRequestNotLoading(
            "get",
            AppConstant.API.TOKEN_EXPIRES_IN_API
        );
    }

    refreshToken(): Observable<DataRes<[]>> {
        return this.httpService.performRequestNotLoading(
            "get",
            AppConstant.API.TOKEN_REFRESH_API
        );
    }

    logout(): Observable<any> {
        // this.loaderService.isLoading.next(true);

        return this.http.post(AppConstant.API.SIGN_OUT_API, {}).pipe(
            finalize(() => {
                // this.loaderService.isLoading.next(false);
            })
        );
    }

    doesHttpOnlyCookieExist(cookieName: string) {
        let d = new Date();
        d.setTime(d.getTime() + 1000);
        let expires = "expires=" + d.toUTCString();

        document.cookie = cookieName + "=new_value;path=/;" + expires;
        return document.cookie.indexOf(cookieName + "=") == -1;
    }

    isLoggedIn() {
        // return this.doesHttpOnlyCookieExist(SettingConstant.COOKIE_NAME);
        return true
    }

    isRefreshTokenExist() {
        return this.doesHttpOnlyCookieExist("refreshToken");
    }

    getCurrentUser() {
        return this.http.get<UserResponse>("api/current-user");
    }
}
