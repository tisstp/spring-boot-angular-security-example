import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from 'src/app/core/containers';
import { PathResolveService } from 'src/app/core/services';

const config: ExtraOptions = {
  useHash: false
};

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'prefix' },
  {
    path: 'auth',
    loadChildren: () => import('@modules/auth').then(m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('@modules/home').then(m => m.HomeModule)
  },
  /**
   * https://www.tektutorialshub.com/angular/angular-http-error-handling/
   * Unauthorized (401), Forbidden (403), Not found (404), internal Server Error (500)
   * this.router.navigateByUrl("/unauthorized");
   */
  {
    path: '**',
    resolve: {
      path: PathResolveService
    },
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
