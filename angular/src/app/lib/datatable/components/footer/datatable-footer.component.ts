import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Logger } from '@shared/classes';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Subscription } from 'rxjs';
import { PageResponse } from 'src/app/lib/datatable/models/datatable-model';
import { PageState } from 'src/app/lib/datatable/models/page-state';
import { DatatableService } from 'src/app/lib/datatable/services/datatable.service';

const log = new Logger('DatatableFooter');

@Component({
  selector: 'datatable-footer',
  templateUrl: './datatable-footer.component.html',
  styleUrls: ['./datatable-footer.component.scss']
})
export class DatatableFooterComponent implements OnInit, OnDestroy {
  maxSizePage: number;
  currentPagination: number;
  isBoundaryLinks: boolean;
  page: PageState;

  private _data: PageResponse<any>;

  get data(): PageResponse<any> {
    return this._data;
  }

  @Input()
  set data(value: PageResponse<any>) {
    this._data = value;
    if (this._data) {
      this.isBoundaryLinks = this._data.totalPages > this.maxSizePage;
    }
  }

  private pageSubscription: Subscription;

  constructor(private datatableService: DatatableService) {
    this.maxSizePage = datatableService.maxSizePage;
    this.currentPagination = 1;
    this.subscribePageState();
  }

  ngOnInit(): void {
    this.page = this.datatableService.initialPageState();
  }

  ngOnDestroy(): void {
    if (this.pageSubscription) {
      this.pageSubscription.unsubscribe();
    }
  }

  onPageChanged(pageChanged: PageChangedEvent) {
    if (this.page.eventType !== 'changedSize') {
      this.datatableService.updateCurrentPage({
        ...this.page,
        currentPage: pageChanged.page - 1
      });
    }
  }

  private subscribePageState() {
    this.pageSubscription = this.datatableService.pageState$.subscribe(state => {
      this.page = { ...state };
      const currentPageForPagination = this.datatableService.isStartPageAtZero ? 1 : 0;
      this.currentPagination = this.page.currentPage + currentPageForPagination;
    });
  }
}
