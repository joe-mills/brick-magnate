import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { fas } from '@fortawesome/pro-solid-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  FontAwesomeModule,
  FaIconLibrary,
  FaConfig,
} from '@fortawesome/angular-fontawesome';
import { NavFrameModule } from './nav-frame/nav-frame.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ThemeEffects } from './themes/state/theme.effects';
import { AuthorizeInterceptor } from './api-authorization/authorize.interceptor';
import { ApiAuthorizationModule } from './api-authorization/api-authorization.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NavFrameModule,
    SharedModule,
    MatCardModule,
    HttpClientModule,
    ApiAuthorizationModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([ThemeEffects]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary, faConfig: FaConfig) {
    library.addIconPacks(fas, far, fad);
    faConfig.fixedWidth = true;
    // library.addIcons(faCoffee);
  }
}
