import { SettingConstant } from '@core/constants/auth.constant';
import { HttpService } from '@shared/services/http.service';
import { IMenuChildrenItem } from '@core/menu/menu.model';
import { Observable, switchMap, iif, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '@shared/constants';
import { isEmptyArray } from '@shared/helpers';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataRes } from '@shared/model';
import { map } from 'rxjs/operators';

import { ProjectService } from '../../../features/todos/project/project.service';
import { IProject } from '../../../features/todos/project/model/project.model';
import { ITask } from '../../../features/todos/task/model/task.model';
import { MenuConstant } from '../../menu/menu-items';
import { UserResponse } from '../models/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    redirectUrl: string | null = null;

    constructor(
        private http: HttpClient,
        private httpService: HttpService,
        private projectService: ProjectService,
        private router: Router
    ) {}

    getMenu(): Observable<any> {
        const menu = MenuConstant.MENU_ITEMS;

        return this.projectService.getData().pipe(
            switchMap(res => {
                if (res && !isEmptyArray(res.data)) {
                    const typedItems: IMenuChildrenItem[] = res.data.map(
                        (item: IProject) => {
                            const typedItem: IMenuChildrenItem = {
                                id: item.id,
                                childOfProject: true,
                                color: item.color,
                                countTask: this.projectService.countTask(item),
                                icon: '',
                                name: item.title,
                                route: item.titleSlug + '-' + item.id,
                                type: 'link',
                                view: item.view,
                            };
                            return typedItem;
                        }
                    );

                    menu.forEach(val => {
                        if (val.id === 'project') {
                            val.child = typedItems;
                        }
                    });
                } else {
                    this.router.navigate([`${AppConstant.PAGE.TODAY_PAGE}`]);
                }
                return of(menu);
            })
        );
    }

    login(username: string, password: string): Observable<any> {
        return this.http
            .post(AppConstant.API.SIGN_IN_API, { password, username })
            .pipe(
                map(() => {
                    if (this.redirectUrl) {
                        window.location.href = this.redirectUrl;
                        this.redirectUrl = null;
                    } else {
                        window.location.href = AppConstant.PAGE.TODAY_PAGE;
                        // this.router.navigate([`${AppConstant.PAGE.TODAY_PAGE}`]);
                    }
                })
            );
    }

    doesHttpOnlyCookieExist(cookieName: string) {
        const d = new Date();
        d.setTime(d.getTime() + 1000);
        const expires = 'expires=' + d.toUTCString();

        document.cookie = cookieName + '=new_value;path=/;' + expires;
        return document.cookie.indexOf(cookieName + '=') == -1;
    }

    register(
        username: string,
        email: string,
        password: string
    ): Observable<any> {
        return this.http.post(AppConstant.API.SIGN_UP_API, {
            email,
            password,
            username,
        });
    }

    getTokenExpiresIn(): Observable<DataRes<{ expiresIn: number }>> {
        return this.httpService.performRequestNotLoading(
            'get',
            AppConstant.API.TOKEN_EXPIRES_IN_API
        );
    }

    refreshToken(): Observable<DataRes<[]>> {
        return this.httpService.performRequestNotLoading(
            'get',
            AppConstant.API.TOKEN_REFRESH_API
        );
    }

    logout(): Observable<any> {
        return this.httpService.performRequest(
            'post',
            AppConstant.API.SIGN_OUT_API
        );
    }

    getConditionalMenu() {
        return iif(() => this.isLoggedIn(), this.getMenu(), of([]));
    }

    isLoggedIn() {
        return this.doesHttpOnlyCookieExist(SettingConstant.COOKIE_NAME);
    }

    // isRefreshTokenExist() {
    //     return this.doesHttpOnlyCookieExist("refreshToken");
    // }

    getCurrentUser() {
        return this.http.get<UserResponse>('api/current-user');
    }
}
