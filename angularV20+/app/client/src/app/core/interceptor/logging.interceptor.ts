import {
    HttpResponse, HttpInterceptorFn
} from "@angular/common/http";
import { tap } from "rxjs";

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
    const started = Date.now();

    return next(req).pipe(
        tap(event => {
            if (event instanceof HttpResponse) {
                const elapsed = Date.now() - started;
                console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
            }
        })
    );
};
