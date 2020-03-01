import { Component, Input } from '@angular/core';
import { TableTemplate } from 'src/app/lib/datatable/containers/template/table-template';

@Component({
  selector: 'datatable-column',
  template: ''
})
export class DatatableColumnComponent extends TableTemplate {
  // for use in header, body and footer
  @Input() style: any;
  @Input() styleClass: string;

  // for table header
  @Input() headerName: string;
  @Input() headerStyle: any;
  @Input() headerStyleClass: string;
  @Input() sortable = false;
  // @Input() sortable: SortType = 'none';

  // for table body
  @Input() field: string | 'recordNo' | 'checkbox';
  @Input() rowspan: number;
  @Input() colspan: number;
  @Input() bodyStyle: any;
  @Input() bodyStyleClass: string;

  // for table footer
  @Input() footerName: string;
  @Input() footerStyle: any;
  @Input() footerStyleClass: string;
}
