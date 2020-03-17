import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Subscription } from 'rxjs';
import { PageResponse } from 'src/app/lib/datatable/models/datatable-model';
import { DatatableService } from 'src/app/lib/datatable/services/datatable.service';

@Component({
  selector: 'datatable-footer',
  templateUrl: './datatable-footer.component.html',
  styleUrls: ['./datatable-footer.component.scss']
})
export class DatatableFooterComponent implements OnInit, OnDestroy {
  @Input()
  set isDisabled(value: boolean) {
    setTimeout(() => {
      this._isDisabled = value;
    }, 0);
  }
  @Input() showTotalEntries;
  @Input() showPagination;
  @Input() sizeOfPage;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChangedPage: EventEmitter<number> = new EventEmitter<number>();

  _isDisabled = false;
  maxSizePage: number;
  currentPagination: number;
  isBoundaryLinks: boolean;

  private _data: PageResponse<any>;

  get data(): PageResponse<any> {
    return this._data;
  }

  @Input()
  set data(value: PageResponse<any>) {
    this._data = value;
    if (this._data) {
      this.isBoundaryLinks = this._data.totalPages > this.maxSizePage;
      const currentPageForPagination = this.datatableService.isStartPageAtZero ? 1 : 0;
      this.currentPagination = this._data.pageNumber + currentPageForPagination;
    }
  }

  private pageSubscription: Subscription;

  constructor(private datatableService: DatatableService) {
    this.maxSizePage = datatableService.maxSizePage;
    this.currentPagination = 1;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.pageSubscription) {
      this.pageSubscription.unsubscribe();
    }
  }

  onPageChanged(pageChanged: PageChangedEvent) {
    this.onChangedPage.emit(pageChanged.page - (this.datatableService.isStartPageAtZero ? 1 : 0));
  }
}
