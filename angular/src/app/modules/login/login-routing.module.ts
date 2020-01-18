import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginContainerComponent, LoginPageComponent } from '@modules/login/containers';


const routes: Routes = [
  {
    path: '',
    component: LoginContainerComponent,
    children: [{
      path: '',
      component: LoginPageComponent,
      data: { title: 'Login' }
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
