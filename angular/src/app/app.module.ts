import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { extModules } from 'src/app/build-specifics';
import { Constants } from 'src/app/config/constants';
import { httpInterceptorProviders } from 'src/app/core/http';
import { RootStoreModule } from 'src/app/store';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RootStoreModule,
    extModules, // In a production build you would want to disable the Store Devtools
  ],
  providers: [
    httpInterceptorProviders,
    Constants,
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
