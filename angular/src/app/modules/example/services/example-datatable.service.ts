import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiEndpointsService, ApiHttpService } from 'src/app/core/services';
import { DatatableRequest, PageResponse } from 'src/app/lib/datatable/models/datatable-model';
import { User } from 'src/app/modules/example/models/user';

@Injectable({
  providedIn: 'root'
})
export class ExampleDatatableService {
  // prettier-ignore
  constructor(
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService
  ) {}

  getPageUser(page: number, size: number): Observable<PageResponse<User>> {
    return of({
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
      pageNumber: page,
      pageSize: size,
      totalElements: 200,
      totalPages: Number((200 / size).toFixed(2))
    }).pipe(delay(1000));
  }

  getPageUserFromServer(request: DatatableRequest): Observable<PageResponse<User>> {
    return this.apiHttpService.post<PageResponse<User>>(this.apiEndpointsService.getPageUserEndpoint(request.page), {
      name: request.search
    });
  }
}
