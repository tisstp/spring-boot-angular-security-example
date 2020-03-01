import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Logger } from '@shared/classes';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DatatableColumnComponent } from 'src/app/lib/datatable/containers/column/datatable-column.component';
import { TableTemplate } from 'src/app/lib/datatable/containers/template/table-template';
import { PageRequest, PageResponse } from 'src/app/lib/datatable/models/datatable-model';
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
      this.addCheckboxItemForm();
    }
  }

  get data(): PageResponse<any> {
    return this._data;
  }

  get isHasContent(): boolean {
    return this.data ? this.data.numberOfElements > 0 : false;
  }

  get checkboxItems(): FormArray {
    return this.checkboxForm.get('checkboxItems') as FormArray;
  }

  // for style on table
  @Input() tableContainerStyleClass? = 'table-responsive position-relative mb-2';
  @Input() tableStyleClass? = 'table table-hover table-striped border-bottom mb-0';
  @Input() theadStyleClass? = 'thead-dark text-left';
  @Input() tbodyStyleClass? = 'text-left';

  // for message
  @Input() messageNoContent? = 'No Content!';
  @Input() isLoading = false;

  @Output() datatableChanged: EventEmitter<PageRequest> = new EventEmitter<PageRequest>();

  // for setting column
  @ContentChildren(DatatableColumnComponent) cols: QueryList<DatatableColumnComponent>;
  public columns: DatatableColumnComponent[];

  // for checkbox
  @Input() isUseCheckbox = false;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  public checkboxForm: FormGroup;
  private checkboxSelected: any[] = [];

  // for content
  private _data: PageResponse<any>;

  private columnsSubscription: Subscription;
  private pageSubscription: Subscription;

  constructor(private datatableService: DatatableService) {
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
    const checkboxAll = this.checkboxForm.get('checkboxAll');
    this.checkboxItemAll(checkboxAll.value);
    if (checkboxAll.value) {
      // selected
      this.checkboxSelected.push(...this.data.content);
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
    this.selected.emit(this.checkboxSelected);
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
    this.pageSubscription = this.datatableService.pageState$
      .pipe(debounceTime(this.datatableService.config.debounceTime))
      .subscribe(state => {
        log.debug('subscribe: page', state);
        if (state.eventType === 'changedPage' || state.eventType === 'changedSize') {
          this.datatableChanged.emit({
            page: state.currentPage,
            size: state.sizeOfPage,
            sort: undefined // todo sorting
          });
        }
      });
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
}
