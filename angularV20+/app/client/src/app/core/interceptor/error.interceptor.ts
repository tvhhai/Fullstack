import {
    HttpErrorResponse, HttpInterceptorFn,
} from "@angular/common/http";
import { SettingConstant } from "@core/constants/auth.constant";
import { AppConstant } from "@shared/constants/app.constant";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { inject } from "@angular/core";
// import { ToastrService } from "ngx-toastr";
import { AuthService } from "../authentication/services/auth.service";

export enum STATUS_CODE {
    // CONNECTION_REFUSED = 0,
    UNAUTHORIZED = 401,
    // FORBIDDEN = 403,
    // NOT_FOUND = 404,
    // INTERNAL_SERVER_ERROR = 500,
}

const getMessage = (error: HttpErrorResponse) => {
    if (error.error?.message) {
        return error.error.message;
    }
    if (error.error?.msg) {
        return error.error.msg;
    }
    return `${error.status} ${error.statusText}`;
};

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    // const toast = inject(ToastrService); // nếu dùng thì bật lên

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            // toast.error(getMessage(error));

            if (
                error.status === STATUS_CODE.UNAUTHORIZED &&
                authService.doesHttpOnlyCookieExist(SettingConstant.COOKIE_NAME)
            ) {
                authService.refreshToken().subscribe({
                    error: () => {
                        authService.logout().subscribe(() => {
                            window.location.href = AppConstant.PAGE.SIGN_IN_PAGE;
                        });
                    },
                    next: () => {
                        window.location.reload();
                    },
                });
            }

            return throwError(() => error);
        })
    );
};