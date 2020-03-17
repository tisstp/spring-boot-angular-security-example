export class DatatableColumn {
  // for use in header, body and footer
  style?: any;
  styleClass?: string;

  // for table header
  headerName?: string;
  headerStyle?: any;
  headerStyleClass?: string;
  sortable? = false;

  // for table body
  field?: string | 'recordNo' | 'checkbox';
  bodyStyle?: any;
  bodyStyleClass?: string;
}
