import { Injectable } from "@angular/core";
import { finalize, iif, Observable, of, switchMap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AppConstant } from "@shared/constants";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { LoaderService } from "@shared/services/loader.service";
import { MenuConstant } from "../../menu/menu-items";
import { UserResponse } from "../models/auth";
import { SettingConstant } from "@core/constants/auth.constant";
import { ProjectService } from "../../../features/todos/project/project.service";
import { isEmptyArray } from "@shared/helpers";
import { IMenuChildrenItem, IMenuItem } from "@core/menu/menu.model";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    redirectUrl: any;

    constructor(
        private http: HttpClient,
        private router: Router,
        private loaderService: LoaderService,
        private projectService: ProjectService
    ) {
    }

    login(username: string, password: string): Observable<any> {
        return this.http
            .post(AppConstant.API.SIGN_IN_API, { username, password })
            .pipe(
                map(() => {
                    if (this.redirectUrl) {
                        window.location.href = this.redirectUrl;
                        this.redirectUrl = null;
                    } else {
                        this.router.navigate([`${AppConstant.PAGE.TODAY_PAGE}`]);
                    }
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
        d.setTime(d.getTime() + 1000);
        let expires = "expires=" + d.toUTCString();

        document.cookie = cookieName + "=new_value;path=/;" + expires;
        return document.cookie.indexOf(cookieName + "=") == -1;
    }

    refreshToken() {
        return this.http.get(AppConstant.API.TOKEN_REFRESH_API);
    }

    isLoggedIn() {
        return this.doesHttpOnlyCookieExist(SettingConstant.COOKIE_NAME);
    }

    getCurrentUser() {
        return this.http.get<UserResponse>("api/current-user");
    }

    getConditionalMenu() {
        return iif(() => this.isLoggedIn(), this.getMenu(), of({}));
    }

    getMenu(): Observable<any> {
        // this.projectService.getData().subscribe({
        //     next: (res) => {
        //         console.log(res);
        //     }
        // });
        // return of(MenuConstant.MENU_ITEMS);
        const menu = MenuConstant.MENU_ITEMS;

        return this.projectService.getData().pipe(
            switchMap((res) => {

                if (!isEmptyArray(res.data)) {

                    res.data.forEach((item) => {
                        const typedItem: IMenuItem = item as unknown as IMenuItem;
                        typedItem.name = item.title;
                        typedItem.route = item.title;
                        typedItem.type = "link";
                        typedItem.icon = "";
                    });


                    menu.forEach(val => {
                        if (val.id === "project") {
                            val.child = res.data as unknown as IMenuChildrenItem[];
                        }
                    });
                }

                return of(menu);
            })
        );
    }

}
