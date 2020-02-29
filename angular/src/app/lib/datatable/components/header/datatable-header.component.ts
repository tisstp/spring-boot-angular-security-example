import { Component, OnInit } from '@angular/core';
import { DatatableService } from 'src/app/lib/datatable/services/datatable.service';

@Component({
  selector: 'datatable-header',
  templateUrl: './datatable-header.component.html',
  styleUrls: ['./datatable-header.component.scss']
})
export class DatatableHeaderComponent implements OnInit {
  sizeOfPage: number;
  itemPerPageList: number[];

  constructor(private datatableService: DatatableService) {
    this.sizeOfPage = datatableService.sizeOfPage;
    this.itemPerPageList = datatableService.itemPerPageList;
  }

  ngOnInit(): void {}

  trackByFn(index: number, item: any) {
    return item;
  }

  selectedSizeOfPage(size: number) {
    this.sizeOfPage = size;
    // todo: callback event
  }
}
