import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from "@angular/router";
import {SIGN_IN_URL} from "../constants/app.constant";

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

    constructor(private router: Router) {
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
            // TODO handle show error
            console.log(this.getMessage(error))
            if (error.status === STATUS.UNAUTHORIZED) {
                this.router.navigateByUrl(SIGN_IN_URL);
            }
        }

        return throwError(error);
    }
}
