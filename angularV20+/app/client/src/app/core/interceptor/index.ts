import { provideHttpClient, withInterceptors } from "@angular/common/http";

import { appHttpInterceptor } from "./app-http.interceptor";
import { baseUrlInterceptor } from "@core/interceptor/base-url.interceptor";
import { cacheInterceptor } from "@core/interceptor/cache.interceptor";
import { errorInterceptor } from "@core/interceptor/error.interceptor";
import { loggingInterceptor } from "@core/interceptor/logging.interceptor";

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
    provideHttpClient(
        withInterceptors([
            baseUrlInterceptor,
            appHttpInterceptor,
            // cacheInterceptor,
            // errorInterceptor,
            // loggingInterceptor
        ])
    ),
];
