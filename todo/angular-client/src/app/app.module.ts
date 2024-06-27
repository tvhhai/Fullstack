import { CustomCurrencyMaskConfig } from '@shared/configs/currency-mask.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BASE_URL } from '@core/interceptor/base-url.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoaderService } from '@shared/services/loader.service';
import { httpInterceptorProviders } from '@core/interceptor';
import { appInitializerProviders } from '@core/initializer';
import { BrowserModule } from '@angular/platform-browser';
import { CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';
import { CoreModule } from '@core/core.module';
import { environment } from '@env/environment';
import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
// import { Router } from "@angular/router";

import {
    MAT_SNACK_BAR_DATA,
    MatSnackBarRef,
} from '@angular/material/snack-bar';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { SettingsDialogComponent } from './features/settings/settings.dialog.component';
import { FeaturesModule } from './features/features.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Required for AOT compilation
export function TranslateHttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({ bootstrap: [AppComponent],
    declarations: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        LayoutModule,
        NgbModule,
        AppRoutingModule,
        SharedModule,
        FeaturesModule,
        CKEditorModule,
        ToastrModule.forRoot({
            autoDismiss: true,
            maxOpened: 5,
        }),
        NgxPermissionsModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                deps: [HttpClient],
                provide: TranslateLoader,
                useFactory: TranslateHttpLoaderFactory,
            },
        })], providers: [
        appInitializerProviders,
        httpInterceptorProviders,
        LoaderService,
        { provide: BASE_URL, useValue: environment.baseUrl },
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
        { provide: MatSnackBarRef, useValue: {} },
        { provide: MAT_SNACK_BAR_DATA, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {
    // constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;
    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
    // }
}
