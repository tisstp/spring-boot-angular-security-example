import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Logger } from '@shared/classes';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, merge } from 'rxjs/operators';
import { DatatableColumnComponent } from 'src/app/lib/datatable/containers/column/datatable-column.component';
import { TableTemplate } from 'src/app/lib/datatable/containers/template/table-template';
import { ColumnSortingDirective } from 'src/app/lib/datatable/directive/column-sorting.directive';
import { SortEnum } from 'src/app/lib/datatable/models/datatable-enum';
import { DatatableRequest, PageRequest, PageResponse, SortColumn } from 'src/app/lib/datatable/models/datatable-model';
import { PageState } from 'src/app/lib/datatable/models/page-state';
import { DatatableSearchService } from 'src/app/lib/datatable/services/datatable-search.service';
import { DatatableService } from 'src/app/lib/datatable/services/datatable.service';

const log = new Logger('Datatable');

@Component({
  selector: 'datatable',
  templateUrl: './datatable-table.component.html',
  styleUrls: ['./datatable-table.component.scss']
})
export class DatatableTableComponent extends TableTemplate implements AfterContentInit, OnDestroy {
  @Input()
  set data(value: PageResponse<any>) {
    this._data = value;
    if (this._data) {
      this.datatableService.updatePageState({
        sizeOfPage: value.pageSize,
        currentPage: value.pageNumber
      });
      this.pageRequest = {
        ...this.pageRequest,
        size: value.pageSize,
        page: value.pageNumber
      };
      this.addCheckboxItemForm();
      this.checkboxAll.patchValue(false);
      this.checkboxSelected = [];
    }
  }

  get data(): PageResponse<any> {
    return this._data;
  }

  get isHasContent(): boolean {
    return this.data ? this.data.numberOfElements > 0 : false;
  }

  get checkboxAll(): FormControl {
    return this.checkboxForm.get('checkboxAll') as FormControl;
  }

  get checkboxItems(): FormArray {
    return this.checkboxForm.get('checkboxItems') as FormArray;
  }

  get pageStartAtZero(): number {
    return this.datatableService.pageStartAtZero;
  }

  get sizeOfPageInit(): number {
    return this.datatableService.sizeOfPageInit;
  }

  // for style on table
  @Input() tableContainerStyleClass? = 'table-responsive position-relative mb-2';
  @Input() tableStyleClass? = 'table table-hover table-striped border-bottom mb-0';
  @Input() theadStyleClass? = 'thead-dark text-left';
  @Input() tbodyStyleClass? = 'text-left';

  // for message
  @Input() messageNoContent? = 'No Content!';
  @Input() isLoading = false;

  @Output() datatableChanged: EventEmitter<DatatableRequest> = new EventEmitter<DatatableRequest>();
  public pageRequest: PageRequest;
  public searchRequest: string;

  // for setting column
  @ContentChildren(DatatableColumnComponent) cols: QueryList<DatatableColumnComponent>;
  public columns: DatatableColumnComponent[];

  // for sorting
  @Input() multipleSorting = false;
  @ViewChildren(ColumnSortingDirective) columnSortingDirectives: QueryList<ColumnSortingDirective>;
  public sortingColumns: ColumnSortingDirective[];
  public sortCurrent: SortColumn;

  // for checkbox
  @Input() isUseCheckbox = false;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  public checkboxForm: FormGroup;
  private checkboxSelected: any[] = [];

  // for content
  private _data: PageResponse<any>;

  private sortColumnSubject$ = new Subject<SortColumn[]>();
  private columnsSubscription: Subscription;
  private pageSubscription: Subscription;

  constructor(private datatableService: DatatableService, private datatableSearchService: DatatableSearchService) {
    super();
    this.subscribePageState();
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
    this.initColumns();
    this.initCheckboxForm();
    this.addCheckboxItemForm();
    this.subscribeOnChangeDatatableColumnComponent();
  }

  ngOnDestroy(): void {
    if (this.columnsSubscription) {
      this.columnsSubscription.unsubscribe();
    }
    if (this.pageSubscription) {
      this.pageSubscription.unsubscribe();
    }
  }

  checkboxAllChanged() {
    this.checkboxItemAll(this.checkboxAll.value);
    if (this.checkboxAll.value) {
      // selected
      const items = this.data.content.filter(item => !this.checkboxSelected.includes(item));
      this.checkboxSelected.push(...items);
    } else {
      // unselected
      this.checkboxSelected = [];
    }
    this.selected.emit(this.checkboxSelected);
  }

  checkboxItemChanged(index: number, item: any) {
    const val = this.checkboxItems.at(index);
    if (val.value) {
      // selected
      this.checkboxSelected.push(item);
    } else {
      // unselected
      const indexInArr = this.checkboxSelected.indexOf(item);
      this.checkboxSelected.splice(indexInArr, 1);
    }
    this.setCheckboxAllByItemAllSelected();
    this.selected.emit(this.checkboxSelected);
  }

  onSorted(sortColumn: SortColumn) {
    if (!this.sortingColumns) {
      this.sortingColumns = this.columnSortingDirectives.toArray();
    }

    if (this.multipleSorting) {
      // todo: multiple sorting... coming soon...
      console.log(this.sortingColumns);
    } else {
      if (!this.sortCurrent) {
        this.sortCurrent = sortColumn;
      } else if (this.sortCurrent.field === sortColumn.field) {
        this.sortCurrent.type = sortColumn.type;
      } else {
        this.setSortingByField({ field: this.sortCurrent.field, type: 'none' });
        this.sortCurrent = sortColumn;
      }
    }
    this.sortColumnSubject$.next([this.sortCurrent]); // todo: input multiple sorting.
  }

  private initColumns() {
    this.columns = this.cols.toArray();
  }

  private subscribeOnChangeDatatableColumnComponent() {
    this.columnsSubscription = this.cols.changes.subscribe(col => {
      this.initColumns();
    });
  }

  private subscribePageState() {
    // prettier-ignore
    this.pageSubscription = this.datatableService.pageState$
      .pipe(
        merge(
          this.sortColumnSubject$.asObservable(),
          this.datatableSearchService.search$
        ),
        debounceTime(this.datatableService.config.debounceTime)
      )
      .subscribe((state: PageState | SortColumn[] | string) => {
        log.debug('subscribe: page', state);
        if (state instanceof Array) {
          this.pageRequest = {
            ...this.pageRequest,
            sort: state
          };
          this.outputDatatableChanged();
        } else if (typeof state === 'string') {
          this.searchRequest = state;
          this.outputDatatableChanged();
        } else {
          if (state.eventType === 'changedPage' || state.eventType === 'changedSize') {
            this.pageRequest = {
              ...this.pageRequest,
              page: state.currentPage,
              size: state.sizeOfPage
            };
            this.outputDatatableChanged();
          }
        }
      });
  }

  private outputDatatableChanged() {
    const request: DatatableRequest = {
      page: this.pageRequest,
      search: this.searchRequest
    };
    this.datatableChanged.emit(request);
  }

  private initCheckboxForm() {
    this.checkboxForm = new FormGroup({
      checkboxAll: new FormControl(false),
      checkboxItems: new FormArray([])
    });
  }

  private addCheckboxItemForm() {
    if (this.isUseCheckbox) {
      if (this.data && this.data.content) {
        this.checkboxItems.clear();
        for (const item of this.data.content) {
          this.checkboxItems.push(new FormControl(false));
        }
      }
    }
  }

  private checkboxItemAll(result: boolean) {
    this.checkboxItems.patchValue(this.checkboxItems.getRawValue().map(val => result));
  }

  private setCheckboxAllByItemAllSelected() {
    const countItemAll = this.checkboxItems.length;
    const countItemSelected = this.checkboxSelected.length;
    this.checkboxAll.patchValue(countItemAll === countItemSelected);
  }

  private setSortingByField(sortColumn: SortColumn) {
    this.sortingColumns
      .filter(item => item.sortable && item.field === sortColumn.field)
      .forEach(item => {
        if (sortColumn.type === SortEnum.NONE) {
          item.setSortingToNone();
        } else if (sortColumn.type === SortEnum.ASC) {
          item.setSortingToAsc();
        } else if (sortColumn.type === SortEnum.DESC) {
          item.setSortingToDesc();
        }
      });
  }
}
