import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsService } from 'src/app/core/services/api-endpoints.service';
import { ApiHttpService } from 'src/app/core/services/api-http.service';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor(
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService
  ) { }

  withCsrfXsrf(obj: any): Observable<any> {
    return this.apiHttpService.post(this.apiEndpointsService.getExampleEndpoint(), obj);
  }

  hello(obj: any): Observable<any> {
    return this.apiHttpService.put('http://localhost:9000/api/hello', obj);
  }

}
