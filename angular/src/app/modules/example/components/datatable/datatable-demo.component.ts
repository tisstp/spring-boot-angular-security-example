import { Component, OnInit } from '@angular/core';
import { PageResponse } from 'src/app/lib/datatable/models/datatable-model';
import { User } from 'src/app/modules/example/models/user';

@Component({
  selector: 'app-datatable-demo',
  templateUrl: './datatable-demo.component.html',
  styleUrls: ['./datatable-demo.component.scss']
})
export class DatatableDemoComponent implements OnInit {
  userPage: PageResponse<User>;

  constructor() {}

  ngOnInit(): void {
    this.userPage = {
      content: [
        {
          id: 10001,
          name: 'Ranga',
          passportNumber: 'E1234567'
        },
        {
          id: 10005,
          name: 'Ravi1',
          passportNumber: 'A1234578'
        },
        {
          id: 10006,
          name: 'Ravi2',
          passportNumber: 'A1234568'
        },
        {
          id: 100010,
          name: 'Ravi3',
          passportNumber: 'A1239568'
        },
        {
          id: 10004,
          name: 'Ravi3',
          passportNumber: 'A1234568'
        },
        {
          id: 10003,
          name: 'Ravi4',
          passportNumber: 'A1234569'
        },
        {
          id: 10007,
          name: 'Ravi5',
          passportNumber: 'A1234668'
        },
        {
          id: 10008,
          name: 'Ravi7',
          passportNumber: 'A1234768'
        },
        {
          id: 10009,
          name: 'Ravi8',
          passportNumber: 'A1234568'
        },
        {
          id: 10002,
          name: 'Ravi9',
          passportNumber: 'A1234568'
        }
      ],
      numberOfElements: 10,
      pageNumber: 0,
      pageSize: 10,
      totalElements: 200,
      totalPages: 20
    };
  }
}
