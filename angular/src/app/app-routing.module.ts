import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

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
  {
    path: 'example',
    loadChildren: () => import('@modules/example').then(m => m.ExampleModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
