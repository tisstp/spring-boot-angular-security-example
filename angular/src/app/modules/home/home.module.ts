import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeContainerComponent, WelcomePageComponent } from '@modules/home/containers';
import { HomeRoutingModule } from './home-routing.module';

const CONTAINERS = [
  HomeContainerComponent,
  WelcomePageComponent
];

const COMPONENTS = [];

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule
  ],
  declarations: [CONTAINERS, COMPONENTS]
})
export class HomeModule {
}
