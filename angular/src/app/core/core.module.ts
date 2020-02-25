import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HighlightCardComponent, ToolbarComponent } from 'src/app/core/components';
import { AppComponent, NotFoundPageComponent } from 'src/app/core/containers';
import { httpInterceptorProviders } from 'src/app/core/http';

const COMPONENTS = [
  ToolbarComponent,
  HighlightCardComponent,
];

const CONTAINERS = [
  AppComponent,
  NotFoundPageComponent
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
  declarations: [CONTAINERS, COMPONENTS],
  exports: [CONTAINERS, COMPONENTS]
})
export class CoreModule {
}
