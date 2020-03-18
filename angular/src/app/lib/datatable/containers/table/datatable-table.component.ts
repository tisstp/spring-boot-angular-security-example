import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { DatatableColumnComponent } from 'src/app/lib/datatable/containers/column/datatable-column.component';
import { TableTemplate } from 'src/app/lib/datatable/containers/template/table-template';
import { SortEnum } from 'src/app/lib/datatable/models/datatable-enum';
import { DatatableRequest, PageRequest, PageResponse, SortColumn } from 'src/app/lib/datatable/models/datatable-model';
import { DatatableService } from 'src/app/lib/datatable/services/datatable.service';

@Component({
  selector: 'datatable',
  templateUrl: './datatable-table.component.html',
  styleUrls: ['./datatable-table.component.scss']
})
export class DatatableTableComponent extends TableTemplate implements AfterContentInit, OnDestroy {
  @Input()
  set data(value: PageResponse<any>) {
    setTimeout(() => {
      this._data = value;
      if (this._data) {
        this.pageRequest = {
          ...this.pageRequest,
          size: value.pageSize,
          page: value.pageNumber
        };
        this.checkboxSelected = [];
        this.addCheckboxItemForm();
        this.checkboxPageAll.patchValue(this._checkboxAll);
      }
    }, 0);
  }

  get data(): PageResponse<any> {
    return this._data;
  }

  @Input()
  set checkboxAll(value: boolean) {
    this._checkboxAll = value;
    if ((this._checkboxAll === true || this._checkboxAll === false) && this.checkboxForm && this._checkboxAllEvent === 'input') {
      this._checkboxAllEvent = 'input';
      this.checkboxPageAll.patchValue(this._checkboxAll);
      this.checkboxPageAllChanged();
    }
    if (this._checkboxAllEvent === 'table') {
      this._checkboxAllEvent = 'input';
    }
  }

  get isHasContent(): boolean {
    return this.data ? this.data.numberOfElements > 0 : false;
  }

  get checkboxPageAll(): FormControl {
    return this.checkboxForm.get('checkboxPageAll') as FormControl;
  }

  get checkboxPageItems(): FormArray {
    return this.checkboxForm.get('checkboxPageItems') as FormArray;
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

  @Input() showSearch = false;
  @Input() showTotalEntries = true;
  @Input() showPagination = true;
  @Input() isDisabled = false;

  @Output() datatableChanged: EventEmitter<DatatableRequest> = new EventEmitter<DatatableRequest>();
  public pageRequest: PageRequest;
  public searchRequest: string;

  // for setting column
  @ContentChildren(DatatableColumnComponent) cols: QueryList<DatatableColumnComponent>;
  public columns: DatatableColumnComponent[];

  // for sorting
  @Input() multipleSorting = false;
  public sortCurrent: SortColumn;

  // for checkbox
  @Input() isUseCheckbox = false;
  @Output() unselectCheckboxAll: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  public checkboxForm: FormGroup;
  private _checkboxAll = false;
  private _checkboxAllEvent: 'input' | 'table' = 'input';
  private checkboxSelected: any[] = [];

  // for content
  private _data: PageResponse<any>;

  private sortColumnSubject$ = new Subject<SortColumn[]>();
  private columnsSubscription: Subscription;
  private pageSubscription: Subscription;
  private sortColumnSubscription: Subscription;

  constructor(public datatableService: DatatableService) {
    super();
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
    this.initColumns();
    this.initCheckboxForm();
    this.addCheckboxItemForm();
    this.subscribeOnChangeDatatableColumnComponent();
    this.subscribeOnSortColumn();
  }

  ngOnDestroy(): void {
    if (this.columnsSubscription) {
      this.columnsSubscription.unsubscribe();
    }
    if (this.pageSubscription) {
      this.pageSubscription.unsubscribe();
    }
    if (this.sortColumnSubscription) {
      this.sortColumnSubscription.unsubscribe();
    }
  }

  checkboxPageAllChanged() {
    this.checkboxItemAll(this.checkboxPageAll.value);
    if (this.checkboxPageAll.value) {
      // selected
      const items = this.data.content.filter(item => !this.checkboxSelected.includes(item));
      this.checkboxSelected.push(...items);
    } else {
      // unselected
      this.checkboxSelected = [];
      this.unselectCheckboxAll.emit(false);
    }
    this.selected.emit(this.checkboxSelected);
  }

  checkboxItemChanged(index: number, item: any) {
    const val = this.checkboxPageItems.at(index);
    if (val.value) {
      // selected
      this.checkboxSelected.push(item);
    } else {
      // unselected
      const indexInArr = this.checkboxSelected.indexOf(item);
      this.checkboxSelected.splice(indexInArr, 1);
      if (this._checkboxAll) {
        this._checkboxAllEvent = 'table';
        this.unselectCheckboxAll.emit(false);
      }
    }
    this.setCheckboxAllByItemAllSelected();
    this.selected.emit(this.checkboxSelected);
  }

  sort(evt: { originalEvent: MouseEvent; sortColumn: SortColumn }) {
    if (this.multipleSorting) {
      // todo: multiple sorting... coming soon...
      console.log('multiple sorting... coming soon...', evt);
    } else {
      this.sortSingle(evt.sortColumn);
    }
  }

  sortSingle(sortColumn: SortColumn) {
    if (this.sortCurrent && this.sortCurrent.field === sortColumn.field) {
      this.sortCurrent.type = sortColumn.type;
    } else {
      this.sortCurrent = sortColumn;
    }

    this.onSort();
    this.datatableService.onSort(this.sortCurrent);
  }

  onSort() {
    // todo: input multiple sorting.
    const list = [];
    if (this.sortCurrent && this.sortCurrent.type != SortEnum.NONE) {
      list.push(this.sortCurrent);
    }
    this.sortColumnSubject$.next(list);
  }

  onSearch(val: string) {
    this.searchRequest = val;
    this.outputDatatableChanged();
  }

  onChangedSizeOfPage(val: number) {
    this.pageRequest = {
      ...this.pageRequest,
      size: val,
      page: this.datatableService.pageStartAtZero
    };
    this.outputDatatableChanged();
  }

  onChangedPage(val: number) {
    this.pageRequest = {
      ...this.pageRequest,
      page: val
    };
    this.outputDatatableChanged();
  }

  private initColumns() {
    this.columns = this.cols.toArray();
  }

  private subscribeOnChangeDatatableColumnComponent() {
    this.columnsSubscription = this.cols.changes.subscribe(col => {
      this.initColumns();
    });
  }

  private subscribeOnSortColumn() {
    this.sortColumnSubscription = this.sortColumnSubject$.asObservable().subscribe(val => {
      this.pageRequest = {
        ...this.pageRequest,
        sort: val
      };
      this.outputDatatableChanged();
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
      checkboxPageAll: new FormControl(this._checkboxAll),
      checkboxPageItems: new FormArray([])
    });
  }

  private addCheckboxItemForm() {
    if (this.isUseCheckbox) {
      if (this.data && this.data.content) {
        this.checkboxPageItems.clear();
        for (const item of this.data.content) {
          this.checkboxPageItems.push(new FormControl(this._checkboxAll));
        }
      }
    }
  }

  private checkboxItemAll(result: boolean) {
    this.checkboxPageItems.patchValue(this.checkboxPageItems.getRawValue().map(val => result));
  }

  private setCheckboxAllByItemAllSelected() {
    const countItemAll = this.checkboxPageItems.length;
    const countItemSelected = this.checkboxSelected.length;
    this.checkboxPageAll.patchValue(countItemAll === countItemSelected);
  }
}
