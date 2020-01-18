import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HighlightCardComponent, ToolbarComponent } from 'src/app/core/components';
import { AppComponent } from 'src/app/core/containers';
import { httpInterceptorProviders } from 'src/app/core/http';

const COMPONENTS = [
  AppComponent,
  ToolbarComponent,
  HighlightCardComponent,
];

@NgModule({
  providers: [
    CookieService,
    httpInterceptorProviders,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {
}
