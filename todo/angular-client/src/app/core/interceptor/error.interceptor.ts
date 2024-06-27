import {
    HttpErrorResponse,
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { SettingConstant } from '@core/constants/auth.constant';
import { AppConstant } from '@shared/constants/app.constant';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { get } from 'lodash';

import { AuthService } from '../authentication/services/auth.service';

export enum STATUS_CODE {
    // CONNECTION_REFUSED = 0,
    UNAUTHORIZED = 401,
    // FORBIDDEN = 403,
    // NOT_FOUND = 404,
    // INTERNAL_SERVER_ERROR = 500,
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private getMessage = (error: HttpErrorResponse) => {
        if (get(error, 'error.message')) {
            return get(error, 'error.message');
        }

        if (error.error?.msg) {
            return error.error.msg;
        }

        return `${error.status} ${error.statusText}`;
    };

    constructor(
        private toast: ToastrService,
        private authService: AuthService
    ) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next
            .handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.handleError(error)
                )
            );
    }

    private handleError(error: HttpErrorResponse) {
        this.toast.error(this.getMessage(error));

        if (
            error.status === STATUS_CODE.UNAUTHORIZED &&
            this.authService.doesHttpOnlyCookieExist(
                SettingConstant.COOKIE_NAME
            )
        ) {
            this.authService.refreshToken().subscribe({
                error: () => {
                    this.authService.logout().subscribe(() => {
                        // this.router.navigate([`${AppConstant.PAGE.SIGN_IN_PAGE}`]);
                        window.location.href = AppConstant.PAGE.SIGN_IN_PAGE;
                    });
                },
                next: () => {
                    window.location.reload();
                },
            });
        }

        return throwError(() => error);
    }
}
