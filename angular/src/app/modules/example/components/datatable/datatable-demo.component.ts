import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatatableSearchEvent, PageRequest, PageResponse } from 'src/app/lib/datatable';
import { User } from 'src/app/modules/example/models/user';
import { ExampleDatatableService } from 'src/app/modules/example/services/example-datatable.service';

@Component({
  selector: 'app-datatable-demo',
  templateUrl: './datatable-demo.component.html',
  styleUrls: ['./datatable-demo.component.scss']
})
export class DatatableDemoComponent extends DatatableSearchEvent<User> implements OnInit {
  constructor(private exampleDatatableService: ExampleDatatableService) {
    super();
  }

  ngOnInit(): void {
    this.onDatatableChanged({ page: 0, size: 10 });
  }

  searchOnDatatable(pageReq: PageRequest): Observable<PageResponse<User>> {
    return this.exampleDatatableService.getPageUser(pageReq.page, pageReq.size);
  }
}
