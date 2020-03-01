import { OnDestroy } from '@angular/core';
import { User } from '@modules/example/models/user';
import { Observable, Subscription } from 'rxjs';
import { PageRequest, PageResponse } from 'src/app/lib/datatable/models/datatable-model';

export abstract class DatatableSearchEvent<T> implements OnDestroy {
  pageData: PageResponse<T>;
  isDatatableLoading: boolean;
  datatableSubscription: Subscription;

  ngOnDestroy(): void {
    this.unsubscribeDatatable();
  }

  onDatatableChanged(pageRequest: PageRequest) {
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
