import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginContainerComponent, LoginPageComponent } from '@modules/login/containers';
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  declarations: [
    LoginContainerComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule {
}
