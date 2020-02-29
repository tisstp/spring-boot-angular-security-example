import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatatableFooterComponent } from './components/footer/datatable-footer.component';
import { DatatableHeaderComponent } from './components/header/datatable-header.component';
import { DatatableColumnComponent } from './containers/column/datatable-column.component';
import { DatatableTableComponent } from './containers/table/datatable-table.component';
import { TableTemplateDirective } from './containers/template/table-template.directive';

// prettier-ignore
@NgModule({
  declarations: [
    DatatableHeaderComponent,
    DatatableFooterComponent,
    DatatableTableComponent,
    DatatableColumnComponent,
    TableTemplateDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TableTemplateDirective
  ]
})
export class DatatableModule {
}
