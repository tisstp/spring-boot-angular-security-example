import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatatableService } from 'src/app/lib/datatable/services/datatable.service';

@Component({
  selector: 'datatable-header',
  templateUrl: './datatable-header.component.html',
  styleUrls: ['./datatable-header.component.scss']
})
export class DatatableHeaderComponent implements OnInit, OnDestroy {
  @Input() showSearch;
  @Input() isDisabled = false;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChangedSizeOfPage: EventEmitter<number> = new EventEmitter<number>();

  sizeOfPage: number;
  itemPerPageList: number[];
  searchText: string;

  constructor(private datatableService: DatatableService) {
    this.sizeOfPage = datatableService.sizeOfPageInit;
    this.itemPerPageList = datatableService.itemPerPageList;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  trackByFn(index: number, item: any) {
    return item;
  }

  onSelectedSizeOfPage(size: number) {
    if (this.sizeOfPage !== size) {
      this.sizeOfPage = size;
      this.onChangedSizeOfPage.emit(size);
    }
  }

  btnSearch() {
    this.onSearch.emit(this.searchText);
  }
}
