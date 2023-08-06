import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from "@angular/common/http";
import { Observable, of, tap } from "rxjs";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    private cache: Map<string, HttpResponse<any>> = new Map();

    constructor() {
    }

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        if (request.method!=="GET") {
            return next.handle(request);
        }

        const cachedResponse = this.cache.get(request.url);

        if (cachedResponse) {
            console.log(`Returning cached response for ${request.url}`);
            return of(cachedResponse);
        }

        return next.handle(request).pipe(
            tap((event) => {
                if (event instanceof HttpResponse) {
                    console.log(`Caching response for ${request.url}`);
                    this.cache.set(request.url, event);
                }
            })
        );
    }
}
