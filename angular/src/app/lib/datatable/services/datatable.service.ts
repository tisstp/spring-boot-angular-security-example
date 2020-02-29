import { Injectable, Optional } from '@angular/core';
import { DatatableServiceConfig } from 'src/app/lib/datatable/config/datatable-service-config';
import { DatatableServiceModule } from 'src/app/lib/datatable/services/datatable-service.module';

@Injectable({
  providedIn: DatatableServiceModule
})
export class DatatableService {
  private readonly _sizeOfPage: number;
  private readonly _itemPerPageList: number[];

  get sizeOfPage(): number {
    return this._sizeOfPage;
  }

  get itemPerPageList(): number[] {
    return this._itemPerPageList;
  }

  constructor(@Optional() config?: DatatableServiceConfig) {
    if (config) {
      this._sizeOfPage = config.sizeOfPage;
      this._itemPerPageList = config.itemPerPageList;
    }
  }
}
