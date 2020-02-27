import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeContainerComponent, WelcomePageComponent } from '@modules/home/containers';

const routes: Routes = [
  {
    path: '',
    component: HomeContainerComponent,
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
      {
        path: 'welcome',
        component: WelcomePageComponent,
        data: { title: 'Welcome' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
