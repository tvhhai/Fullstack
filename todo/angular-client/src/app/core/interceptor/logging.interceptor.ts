import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from "@angular/common/http";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const started = Date.now();
        return next.handle(request).pipe(
            tap((event) => {
                if (event instanceof HttpResponse) {
                    const elapsed = Date.now() - started;
                    // console.log(`Request for ${request.urlWithParams} took ${elapsed} ms.`);
                }
            })
        );
    }
}
