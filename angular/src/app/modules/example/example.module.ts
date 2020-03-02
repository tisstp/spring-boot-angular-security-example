import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DATATABLE_CONFIG } from 'src/app/config/datatable.config';
import { DatatableModule } from 'src/app/lib/datatable/datatable.module';
import { ExampleRoutingModule } from 'src/app/modules/example/example-routing.module';
import { DatatableDemoComponent } from './components/datatable/datatable-demo.component';

// prettier-ignore
@NgModule({
  declarations: [
    DatatableDemoComponent
  ],
  imports: [
    CommonModule,
    ExampleRoutingModule,
    DatatableModule.forRoot(DATATABLE_CONFIG),
  ]
})
export class ExampleModule { }
