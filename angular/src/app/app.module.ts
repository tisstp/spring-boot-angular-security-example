import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { extModules } from 'src/app/build-specifics';
import { CoreModule } from 'src/app/core';
import { AppComponent } from 'src/app/core/containers';
import { RootStoreModule } from 'src/app/store';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RootStoreModule,
    CoreModule,
    extModules // In a production build you would want to disable the Store Devtools
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
