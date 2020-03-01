import { Injectable, Optional } from '@angular/core';
import { Logger } from '@shared/classes';
import { Observable, Subject } from 'rxjs';
import { DatatableServiceConfig } from 'src/app/lib/datatable/config/datatable-service-config';
import { PageState } from 'src/app/lib/datatable/models/page-state';
import { DatatableServiceModule } from 'src/app/lib/datatable/services/datatable-service.module';

const log = new Logger('DatatableService');

@Injectable({
  providedIn: DatatableServiceModule
})
export class DatatableService {
  maxSizePage: number;

  private pageSubject$ = new Subject<PageState>();
  private pageState: PageState;

  private readonly _sizeOfPageInit: number;
  private readonly _itemPerPageList: number[];

  get itemPerPageList(): number[] {
    return this._itemPerPageList;
  }

  get sizeOfPageInit(): number {
    return this._sizeOfPageInit;
  }

  get pageState$(): Observable<PageState> {
    return this.pageSubject$.asObservable();
  }

  constructor(@Optional() config?: DatatableServiceConfig) {
    log.debug('config: ', config);
    if (config) {
      this._sizeOfPageInit = config.sizeOfPage;
      this._itemPerPageList = config.itemPerPageList;
      this.maxSizePage = config.maxSizePage;
    }
  }

  updatePageState(state: PageState) {
    log.debug('updatePageState: ', state);
    this.pageState = state;
    this.pageSubject$.next(state);
  }

  updateCurrentPage(currentPage: number) {
    log.debug('updateCurrentPage: ', currentPage, this.pageState);
    this.pageSubject$.next({
      ...this.pageState,
      currentPage
    });
  }

  updateSizeOfPage(sizeOfPage: number) {
    log.debug('updateSizeOfPage: ', sizeOfPage);
    this.pageSubject$.next({
      ...this.pageState,
      sizeOfPage
    });
  }
}
