import { Component, OnDestroy, OnInit } from '@angular/core';
import { Logger } from '@shared/classes';
import { Subscription } from 'rxjs';
import { DatatableService } from 'src/app/lib/datatable/services/datatable.service';

const log = new Logger('DatatableHeader');

@Component({
  selector: 'datatable-header',
  templateUrl: './datatable-header.component.html',
  styleUrls: ['./datatable-header.component.scss']
})
export class DatatableHeaderComponent implements OnInit, OnDestroy {
  sizeOfPage: number;
  itemPerPageList: number[];
  searchText: string;

  private pageSubscription: Subscription;

  constructor(private datatableService: DatatableService) {
    this.sizeOfPage = datatableService.sizeOfPageInit;
    this.itemPerPageList = datatableService.itemPerPageList;
  }

  ngOnInit(): void {
    this.pageSubscription = this.datatableService.pageState$.subscribe(state => {
      // this.sizeOfPage = state.sizeOfPage;
    });
  }

  ngOnDestroy(): void {
    if (this.pageSubscription) {
      this.pageSubscription.unsubscribe();
    }
  }

  trackByFn(index: number, item: any) {
    return item;
  }

  onSelectedSizeOfPage(size: number) {
    this.sizeOfPage = size;
    this.datatableService.updateSizeOfPage(size);
  }

  onSearch() {
    log.debug(this.searchText);
    // todo: callback event
  }
}
