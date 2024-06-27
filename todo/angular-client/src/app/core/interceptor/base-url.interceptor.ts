import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { InjectionToken, Injectable, Optional, Inject } from '@angular/core';
import { Observable } from 'rxjs';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private hasScheme = (url: string) =>
    this.baseUrl && new RegExp('^http(s)?://', 'i').test(url);

  constructor(@Optional() @Inject(BASE_URL) private baseUrl?: string) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('./assets/')) {
      return next.handle(request);
    }

    return this.hasScheme(request.url) === false
      ? next.handle(request.clone({ url: this.prependBaseUrl(request.url) }))
      : next.handle(request);
  }

  private prependBaseUrl(url: string) {
    return [this.baseUrl?.replace(/\/$/g, ''), url.replace(/^\.?\//, '')]
      .filter(val => val)
      .join('/');
  }
}
