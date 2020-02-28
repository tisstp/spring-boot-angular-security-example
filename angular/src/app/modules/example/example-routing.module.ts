import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatatableDemoComponent } from 'src/app/modules/example/datatable/datatable-demo.component';

const routes: Routes = [
  {
    path: 'datatable',
    component: DatatableDemoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExampleRoutingModule {}
