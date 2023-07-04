import {NgModule, isDevMode} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LayoutModule} from '@angular/cdk/layout';
import {CoreModule} from '@core/core.module';
import {SharedModule} from '@shared/shared.module';

// Component
import {AppComponent} from './app.component';
import {NgxPermissionsModule} from 'ngx-permissions';
import {ServiceWorkerModule} from '@angular/service-worker';
import {BASE_URL} from '@core/interceptor/base-url.interceptor';
import {environment} from '@env/environment';

//Providers
import {httpInterceptorProviders} from '@core/interceptor';
import {appInitializerProviders} from '@core/initializer';
import {LoaderService} from '@shared/services/loader.service';
import {FeaturesModule} from './features/features.module';
import {AppRoutingModule} from './app-routing.module';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig} from "@angular/material/dialog";
import {DialogComponent} from "@shared/components/common/dialog/dialog.component";

// Required for AOT compilation
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  entryComponents: [DialogComponent],

  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    LayoutModule,
    NgbModule,
    AppRoutingModule,
    SharedModule,
    FeaturesModule,
    ToastrModule.forRoot(),
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
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    {
      provide: BASE_URL,
      useValue: environment.baseUrl,
    },
    httpInterceptorProviders,
    appInitializerProviders,

    LoaderService,
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
