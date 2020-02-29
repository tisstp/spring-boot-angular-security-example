import { Component, OnInit } from '@angular/core';
import { Logger } from '@shared/classes';
import { DatatableService } from 'src/app/lib/datatable/services/datatable.service';

const log = new Logger('DatatableHeader');

@Component({
  selector: 'datatable-header',
  templateUrl: './datatable-header.component.html',
  styleUrls: ['./datatable-header.component.scss']
})
export class DatatableHeaderComponent implements OnInit {
  sizeOfPage: number;
  itemPerPageList: number[];
  searchText: string;

  constructor(private datatableService: DatatableService) {
    this.sizeOfPage = datatableService.sizeOfPage;
    this.itemPerPageList = datatableService.itemPerPageList;
  }

  ngOnInit(): void {}

  trackByFn(index: number, item: any) {
    return item;
  }

  onSelectedSizeOfPage(size: number) {
    this.sizeOfPage = size;
    // todo: callback event
  }

  onSearch() {
    log.debug(this.searchText);
    // todo: callback event
  }
}
