import { NgModule, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from "ngx-toastr";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LayoutModule } from '@angular/cdk/layout';
import { CoreModule } from "./core/core.module";

import { SharedModule } from './shared/shared.module';

// Component
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Test1Component } from './components/test1/test1.component';
import { Test2Component } from './components/test2/test2.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgxPermissionsModule } from "ngx-permissions";
import { ServiceWorkerModule } from '@angular/service-worker';
import { httpInterceptorProviders } from "./core/interceptor";
import { BASE_URL } from "./core/interceptor/base-url.interceptor";
import { environment } from "@env/environment";


// Required for AOT compilation
export function TranslateHttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        Test1Component,
        Test2Component,
        PageNotFoundComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
        LayoutModule,
        NgbModule,
        ToastrModule.forRoot(),
        SharedModule,
        NgxPermissionsModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: TranslateHttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
    ],
    providers: [
        {
            provide: BASE_URL,
            useValue: environment.baseUrl,
        },
        httpInterceptorProviders
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    // Diagnostic only: inspect router configuration
    constructor(router: Router) {
        // Use a custom replacer to display function names in the route configs
        // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;
        // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
    }
}
