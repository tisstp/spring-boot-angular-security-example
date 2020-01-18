import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeContainerComponent, WelcomePageComponent } from '@modules/home/containers';


const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: '',
    component: HomeContainerComponent,
    children: [{
      path: 'welcome',
      component: WelcomePageComponent,
      data: { title: 'Welcome' }
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
