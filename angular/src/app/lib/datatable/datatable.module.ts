import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableHeaderComponent } from './components/header/datatable-header.component';
import { DatatableFooterComponent } from './components/footer/datatable-footer.component';
import { DatatableTableComponent } from './containers/table/datatable-table.component';
import { DatatableColumnComponent } from './containers/column/datatable-column.component';

// ignore-prettier
@NgModule({
  declarations: [DatatableHeaderComponent, DatatableFooterComponent, DatatableTableComponent, DatatableColumnComponent],
  imports: [CommonModule]
})
export class DatatableModule {}
