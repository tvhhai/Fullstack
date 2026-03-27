import { inject, InjectionToken } from "@angular/core";
import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export const BASE_URL = new InjectionToken<string>("BASE_URL");

export function baseUrlInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const baseUrl = inject(BASE_URL);

    const hasScheme = (url: string) =>
        baseUrl && new RegExp("^http(s)?://", "i").test(url);

    // bỏ qua request asset
    if (req.url.startsWith("/assets/")) {
        return next(req);
    }

    if (!hasScheme(req.url)) {
        const newUrl = prependBaseUrl(baseUrl, req.url);
        req = req.clone({ url: newUrl });
    }

    return next(req);
}

function prependBaseUrl(baseUrl: string | undefined, url: string) {
    return [baseUrl?.replace(/\/$/g, ""), url.replace(/^\.?\//, "")]
        .filter((val) => val)
        .join("/");
}