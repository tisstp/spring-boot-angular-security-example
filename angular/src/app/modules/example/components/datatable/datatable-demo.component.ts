import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatatableRequest, DatatableSearchEvent, PageRequest, PageResponse } from 'src/app/lib/datatable';
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
    this.onDatatableChanged();
  }

  searchOnDatatable(request: DatatableRequest): Observable<PageResponse<User>> {
    // on mocking.
    // return this.exampleDatatableService.getPageUser(pageReq.page, pageReq.size);

    // on server
    return this.exampleDatatableService.getPageUserFromServer(request);
  }

  onDatatableSelected(selected: User[]) {
    console.log('selected: ', selected);
  }
}
