import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatatableFooterComponent } from './components/footer/datatable-footer.component';
import { DatatableHeaderComponent } from './components/header/datatable-header.component';
import { DatatableColumnComponent } from './containers/column/datatable-column.component';
import { DatatableTableComponent } from './containers/table/datatable-table.component';
import { TableTemplateDirective } from './containers/template/table-template.directive';
import { DatatableBodyComponent } from './components/body/datatable-body.component';

// prettier-ignore
@NgModule({
  declarations: [
    DatatableTableComponent,
    DatatableColumnComponent,
    DatatableHeaderComponent,
    DatatableBodyComponent,
    DatatableFooterComponent,
    TableTemplateDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DatatableTableComponent,
    DatatableColumnComponent,
    TableTemplateDirective
  ]
})
export class DatatableModule {
}
