import { Component, Input, OnInit } from '@angular/core';
import { PageResponse } from 'src/app/lib/datatable/models/datatable-model';

@Component({
  selector: 'datatable',
  templateUrl: './datatable-table.component.html',
  styleUrls: ['./datatable-table.component.scss']
})
export class DatatableTableComponent implements OnInit {
  private _data: PageResponse<any>;

  @Input()
  set data(value: PageResponse<any>) {
    this._data = value;
  }

  constructor() {}

  ngOnInit(): void {}
}
