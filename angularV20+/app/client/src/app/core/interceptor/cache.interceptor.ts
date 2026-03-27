import {
    HttpResponse, HttpInterceptorFn
} from "@angular/common/http";
import { of, tap } from "rxjs";

const cache = new Map<string, HttpResponse<unknown>>();
export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.method !== "GET") {
        return next(req);
    }

    const cachedResponse = cache.get(req.url);
    if (cachedResponse) {
        console.log(`Returning cached response for ${req.url}`);
        return of(cachedResponse);
    }

    return next(req).pipe(
        tap(event => {
            if (event instanceof HttpResponse) {
                console.log(`Caching response for ${req.url}`);
                cache.set(req.url, event);
            }
        })
    );
};
