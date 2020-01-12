import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { httpInterceptorProviders } from 'src/app/core/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
