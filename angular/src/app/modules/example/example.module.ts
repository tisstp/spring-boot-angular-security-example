import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    DatatableModule.forRoot({
      sizeOfPage: 10,
      itemPerPageList: [10, 20, 30, 50, 100]
    }),
  ]
})
export class ExampleModule { }
