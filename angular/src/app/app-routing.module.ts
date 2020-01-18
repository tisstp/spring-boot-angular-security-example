import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const config: ExtraOptions = {
  useHash: true
};

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('@modules/login').then(m => m.LoginModule)
  },
  {
    path: 'home',
    loadChildren: () => import('@modules/home').then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
