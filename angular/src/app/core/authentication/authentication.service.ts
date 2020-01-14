import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsService } from 'src/app/core/services/api-endpoints.service';
import { ApiHttpService } from 'src/app/core/services/api-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService
  ) { }

  withCsrfIgnore(obj: any): Observable<any> {
    return this.apiHttpService.post(this.apiEndpointsService.getAuthEndpoint(), obj);
  }

}
