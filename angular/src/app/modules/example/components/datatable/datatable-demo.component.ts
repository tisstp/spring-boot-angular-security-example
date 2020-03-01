import { Component, OnInit } from '@angular/core';
import { PageRequest, PageResponse } from 'src/app/lib/datatable/models/datatable-model';
import { User } from 'src/app/modules/example/models/user';
import { ExampleDatatableService } from 'src/app/modules/example/services/example-datatable.service';

@Component({
  selector: 'app-datatable-demo',
  templateUrl: './datatable-demo.component.html',
  styleUrls: ['./datatable-demo.component.scss']
})
export class DatatableDemoComponent implements OnInit {
  userPage: PageResponse<User>;

  constructor(private exampleDatatableService: ExampleDatatableService) {}

  ngOnInit(): void {
    this.searchData({ page: 0, size: 10 });
  }

  onChanged($event: PageRequest) {
    this.searchData($event);
  }

  private searchData(pageReq: PageRequest) {
    this.exampleDatatableService.getPageUser(pageReq.page, pageReq.size).subscribe(data => {
      console.log('data: ', data);
      this.userPage = data;
    });
  }
}
