import { Injectable, Optional } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SortColumn } from 'src/app/lib/datatable';
import { DatatableServiceConfig } from 'src/app/lib/datatable/config/datatable-service-config';
import { DatatableServiceModule } from 'src/app/lib/datatable/services/datatable-service.module';

@Injectable({
  providedIn: DatatableServiceModule
})
export class DatatableService {
  public maxSizePage: number;
  public isStartPageAtZero: boolean;

  public sortSource$: Observable<SortColumn>;
  private sortSourceSubject = new Subject<SortColumn>();

  private readonly _sizeOfPageInit: number;
  private readonly _itemPerPageList: number[];

  get itemPerPageList(): number[] {
    return this._itemPerPageList;
  }

  get sizeOfPageInit(): number {
    return this._sizeOfPageInit;
  }

  get pageStartAtZero(): number {
    return this.isStartPageAtZero ? 0 : 1;
  }

  constructor(@Optional() public config?: DatatableServiceConfig) {
    if (config) {
      this._sizeOfPageInit = config.sizeOfPage;
      this._itemPerPageList = config.itemPerPageList;
      this.maxSizePage = config.maxSizePage;
      this.isStartPageAtZero = config.isStartPageAtZero;
    }
    this.sortSource$ = this.sortSourceSubject.asObservable();
  }

  onSort(sortMeta: SortColumn) {
    this.sortSourceSubject.next(sortMeta);
  }
}
