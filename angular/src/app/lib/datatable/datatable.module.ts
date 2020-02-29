import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatatableFooterComponent } from './components/footer/datatable-footer.component';
import { DatatableHeaderComponent } from './components/header/datatable-header.component';
import { DatatableColumnComponent } from './containers/column/datatable-column.component';
import { DatatableTableComponent } from './containers/table/datatable-table.component';
import { TableTemplateDirective } from './containers/template/table-template.directive';
import { RecordNoPagingPipe } from './pipes/record-no-paging.pipe';

// prettier-ignore
@NgModule({
  declarations: [
    DatatableTableComponent,
    DatatableColumnComponent,
    DatatableHeaderComponent,
    DatatableFooterComponent,
    TableTemplateDirective,
    RecordNoPagingPipe,
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
