import { Component, OnDestroy, OnInit } from '@angular/core';
import { Logger } from '@shared/classes';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Subscription } from 'rxjs';
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
  currentPage: number;
  isBoundaryLinks: boolean;
  page: PageState;

  private pageSubscription: Subscription;

  constructor(private datatableService: DatatableService) {
    this.maxSizePage = datatableService.maxSizePage;
    this.subscribePageState();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.pageSubscription) {
      this.pageSubscription.unsubscribe();
    }
  }

  onPageChanged(pageChanged: PageChangedEvent) {
    this.datatableService.updateCurrentPage({
      ...this.page,
      currentPage: pageChanged.page - 1
    });
  }

  private subscribePageState() {
    this.pageSubscription = this.datatableService.pageState$.subscribe(state => {
      log.debug('subscribe: page', state);
      this.page = { ...state };
      this.currentPage = this.page.currentPage;
      this.isBoundaryLinks = this.page.totalPages > this.maxSizePage;
    });
  }
}
