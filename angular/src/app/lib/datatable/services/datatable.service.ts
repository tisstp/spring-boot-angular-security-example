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
  isStartPageAtZero: boolean;

  private pageSubject$ = new Subject<PageState>();

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

  get pageStartAtZero(): number {
    return this.isStartPageAtZero ? 0 : 1;
  }

  constructor(@Optional() config?: DatatableServiceConfig) {
    log.debug('config: ', config);
    if (config) {
      this._sizeOfPageInit = config.sizeOfPage;
      this._itemPerPageList = config.itemPerPageList;
      this.maxSizePage = config.maxSizePage;
      this.isStartPageAtZero = config.isStartPageAtZero;
    }
  }

  updatePageState(state: PageState) {
    log.debug('updatePageState: ', state);
    this.pageSubject$.next(state);
  }

  updateCurrentPage(state: PageState) {
    log.debug('updateCurrentPage: ', state.currentPage + 1);
    this.pageSubject$.next(state);
  }

  updateSizeOfPage(sizeOfPage: number) {
    log.debug('updateSizeOfPage: ', sizeOfPage);
    // this.pageSubject$.next({
    //   sizeOfPage
    // });
  }
}
