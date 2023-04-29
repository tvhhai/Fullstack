import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppHttpInterceptor} from "./app-http.interceptor";
import { TokenInterceptor } from './token.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { LoggingInterceptor } from './logging.interceptor';
import { BaseUrlInterceptor } from "./base-url.interceptor";

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
];
