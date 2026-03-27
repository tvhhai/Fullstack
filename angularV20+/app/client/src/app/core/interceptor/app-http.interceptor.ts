import {
    HttpRequest,
    HttpEvent,
    HttpResponse, HttpInterceptorFn, HttpHandlerFn
} from "@angular/common/http";
import { mergeMap, Observable, of, throwError } from "rxjs";

// import { ToastrService } from "ngx-toastr";

export const appHttpInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    // const toast = inject(ToastrService);

    // Clone request để thêm withCredentials
    const clonedReq = req.clone({
        withCredentials: true,
    });

    return next(clonedReq).pipe(
        mergeMap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                const body: any = event.body;
                if (body && "code" in body && body.code !== 0) {
                    if (body.msg) {
                        // toast.error(body.msg);
                    }
                    return throwError(() => new Error(body.msg || "Unknown error"));
                }
            }
            return of(event);
        })
    );
};
