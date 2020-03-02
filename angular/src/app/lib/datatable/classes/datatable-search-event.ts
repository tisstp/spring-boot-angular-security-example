import { OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DatatableTableComponent } from 'src/app/lib/datatable/containers/table/datatable-table.component';
import { PageRequest, PageResponse } from 'src/app/lib/datatable/models/datatable-model';

export abstract class DatatableSearchEvent<T> implements OnDestroy {
  @ViewChild(DatatableTableComponent, { static: true }) datatableComp: DatatableTableComponent;
  pageData: PageResponse<T>;
  isDatatableLoading: boolean;
  datatableSubscription: Subscription;

  ngOnDestroy(): void {
    this.unsubscribeDatatable();
  }

  onDatatableChanged(pageRequest?: PageRequest) {
    if (!pageRequest) {
      pageRequest = { page: this.datatableComp.pageStartAtZero, size: this.datatableComp.sizeOfPageInit };
    }
    this.isDatatableLoading = true;
    this.unsubscribeDatatable();
    this.datatableSubscription = this.searchOnDatatable(pageRequest).subscribe(data => {
      this.responseFromSearchOnDatatable(data);
    });
  }

  abstract searchOnDatatable(pageRequest: PageRequest): Observable<PageResponse<T>>;

  onDatatableSelected(selected: T[]): void {}

  responseFromSearchOnDatatable(data: PageResponse<T>): void {
    this.pageData = data;
    this.isDatatableLoading = false;
  }

  private unsubscribeDatatable() {
    if (this.datatableSubscription) {
      this.datatableSubscription.unsubscribe();
    }
  }
}
