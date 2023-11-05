import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppHttpInterceptor } from './app-http.interceptor';
import { BaseUrlInterceptor } from './base-url.interceptor';
import { LoggingInterceptor } from './logging.interceptor';
import { ErrorInterceptor } from './error.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { multi: true, provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor },
  { multi: true, provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor },
  { multi: true, provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor },
  { multi: true, provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor },
];
