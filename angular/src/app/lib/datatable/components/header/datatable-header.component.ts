import { Component, OnDestroy, OnInit } from '@angular/core';
import { Logger } from '@shared/classes';
import { Subscription } from 'rxjs';
import { PageState } from 'src/app/lib/datatable/models/page-state';
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
  page: PageState;

  private pageSubscription: Subscription;

  constructor(private datatableService: DatatableService) {
    this.sizeOfPage = datatableService.sizeOfPageInit;
    this.itemPerPageList = datatableService.itemPerPageList;
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

  trackByFn(index: number, item: any) {
    return item;
  }

  onSelectedSizeOfPage(size: number) {
    if (this.sizeOfPage !== size) {
      this.sizeOfPage = size;
      this.datatableService.updateSizeOfPage({
        ...this.page,
        currentPage: this.datatableService.pageStartAtZero,
        sizeOfPage: size
      });
    }
  }

  onSearch() {
    log.debug(this.searchText);
    // todo: callback event
  }

  private subscribePageState() {
    this.pageSubscription = this.datatableService.pageState$.subscribe(state => {
      this.page = { ...state };
    });
  }
}
