import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse, HttpClient
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from "@angular/router";
import {AppConstant} from "../constants/app.constant";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../authentication/services/auth.service";

export enum STATUS {
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private errorPages = [STATUS.FORBIDDEN, STATUS.NOT_FOUND, STATUS.INTERNAL_SERVER_ERROR];
    private getMessage = (error: HttpErrorResponse) => {
        if (error.error?.message) {
            return error.error.message;
        }

        if (error.error?.msg) {
            return error.error.msg;
        }

        return `${error.status} ${error.statusText}`;
    };

    constructor(private router: Router, private http: HttpClient, private toast: ToastrService, private authService: AuthService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next
            .handle(request)
            .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
    }

    private handleError(error: HttpErrorResponse) {

        if (this.errorPages.includes(error.status)) {
            this.router.navigateByUrl(`/${error.status}`, {
                skipLocationChange: true,
            });
        } else {
            console.error('ERROR', error);
            this.toast.error(this.getMessage(error));

            if (error.status === STATUS.UNAUTHORIZED && this.authService.isRefreshTokenExist()) {
                this.authService.refreshToken().subscribe({
                    next: () => {
                        window.location.reload();
                    },
                    error: () => {
                        this.authService.logout().subscribe(() => {
                            // this.router.navigate([`${AppConstant.PAGE.SIGN_IN_PAGE}`]);
                            window.location.href = AppConstant.PAGE.SIGN_IN_PAGE

                        });
                    }
                });
            } else {

            }
        }

        return throwError(error);
    }
}
