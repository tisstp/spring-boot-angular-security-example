import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeContainerComponent, WelcomePageComponent } from '@modules/home/containers';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [
    HomeContainerComponent,
    WelcomePageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule {
}
