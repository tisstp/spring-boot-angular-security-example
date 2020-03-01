import { AfterContentInit, Component, ContentChildren, Input, OnDestroy, OnInit, QueryList } from '@angular/core';
import { Logger } from '@shared/classes';
import { Subscription } from 'rxjs';
import { DatatableColumnComponent } from 'src/app/lib/datatable/containers/column/datatable-column.component';
import { TableTemplate } from 'src/app/lib/datatable/containers/template/table-template';
import { PageResponse } from 'src/app/lib/datatable/models/datatable-model';
import { DatatableService } from 'src/app/lib/datatable/services/datatable.service';

const log = new Logger('Datatable');

@Component({
  selector: 'datatable',
  templateUrl: './datatable-table.component.html',
  styleUrls: ['./datatable-table.component.scss']
})
export class DatatableTableComponent extends TableTemplate implements OnInit, AfterContentInit, OnDestroy {
  // for style on table
  @Input() tableContainerStyleClass? = 'table-responsive position-relative mb-2';
  @Input() tableStyleClass? = 'table table-hover table-striped border-bottom mb-0';
  @Input() theadStyleClass? = 'thead-dark text-left';
  @Input() tbodyStyleClass? = 'text-left';

  // for message
  @Input() messageNoContent? = 'No Content!';

  // for setting column
  @ContentChildren(DatatableColumnComponent) cols: QueryList<DatatableColumnComponent>;
  public columns: DatatableColumnComponent[];
  private columnsSubscription: Subscription;

  // for content
  private _data: PageResponse<any>;

  @Input()
  set data(value: PageResponse<any>) {
    this._data = value;
    this.datatableService.updatePageState({
      sizeOfPage: value.pageSize,
      currentPage: value.pageNumber,
      totalPages: value.totalPages,
      totalElements: value.totalElements
    });
  }

  get data(): PageResponse<any> {
    return this._data;
  }

  get isHasContent(): boolean {
    return this.data ? this.data.numberOfElements > 0 : false;
  }

  constructor(private datatableService: DatatableService) {
    super();
  }

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
    this.initColumns();
    this.subscribeOnChangeDatatableColumnComponent();
  }

  ngOnDestroy(): void {
    if (this.columnsSubscription) {
      this.columnsSubscription.unsubscribe();
    }
  }

  private initColumns() {
    this.columns = this.cols.toArray();
  }

  private subscribeOnChangeDatatableColumnComponent() {
    this.columnsSubscription = this.cols.changes.subscribe(col => {
      log.debug('columns change', col);
      this.initColumns();
    });
  }
}
