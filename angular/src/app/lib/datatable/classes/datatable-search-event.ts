import { OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DatatableTableComponent } from 'src/app/lib/datatable/containers/table/datatable-table.component';
import { DatatableRequest, PageResponse } from 'src/app/lib/datatable/models/datatable-model';

export abstract class DatatableSearchEvent<T> implements OnDestroy {
  @ViewChild(DatatableTableComponent, { static: true }) datatableComp: DatatableTableComponent;
  pageData: PageResponse<T>;
  isDatatableLoading: boolean;
  datatableSubscription: Subscription;

  ngOnDestroy(): void {
    this.unsubscribeDatatable();
  }

  onDatatableChanged(request?: DatatableRequest) {
    if (!request) {
      request = { page: { page: this.datatableComp.pageStartAtZero, size: this.datatableComp.sizeOfPageInit } };
    }
    this.isDatatableLoading = true;
    this.unsubscribeDatatable();
    this.datatableSubscription = this.searchOnDatatable(request).subscribe(
      data => {
        this.responseFromSearchOnDatatable(data);
      },
      error => {
        this.isDatatableLoading = false;
        console.error(error);
      }
    );
  }

  abstract searchOnDatatable(request: DatatableRequest): Observable<PageResponse<T>>;

  onDatatableSelected(selected: T[]): void {}

  responseFromSearchOnDatatable(data: PageResponse<T>): void {
    this.pageData = data;
    this.isDatatableLoading = false;
  }

  clearPageData() {
    this.pageData = null;
  }

  private unsubscribeDatatable() {
    if (this.datatableSubscription) {
      this.datatableSubscription.unsubscribe();
    }
  }
}
