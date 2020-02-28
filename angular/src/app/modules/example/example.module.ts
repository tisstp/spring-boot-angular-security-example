import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleRoutingModule } from 'src/app/modules/example/example-routing.module';
import { DatatableDemoComponent } from './datatable/datatable-demo.component';

// prettier-ignore
@NgModule({
  declarations: [
    DatatableDemoComponent
  ],
  imports: [
    CommonModule,
    ExampleRoutingModule
  ]
})
export class ExampleModule { }
