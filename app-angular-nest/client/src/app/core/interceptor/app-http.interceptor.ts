import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { mergeMap, Observable, of, throwError } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private toast: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
    });
    if (req.url === 'https://www.ag-grid.com/example-assets/row-data.json') {
      req = req.clone({
        withCredentials: false,
      });
    }

    return next
      .handle(req)
      .pipe(mergeMap((event: HttpEvent<any>) => this.handleOkReq(event)));
  }

  private handleOkReq(event: HttpEvent<any>): Observable<any> {
    if (event instanceof HttpResponse) {
      const body: any = event.body;
      if (body && 'code' in body && body.code !== 0) {
        if (body.msg) {
          this.toast.error(body.msg);
        }
        return throwError([]);
      }
    }
    // Pass down event if everything is OK
    return of(event);
  }
}
