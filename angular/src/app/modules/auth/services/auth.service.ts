import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsService } from 'src/app/core/services/api-endpoints.service';
import { ApiHttpService } from 'src/app/core/services/api-http.service';
import { Credentials, User } from 'src/app/modules/auth/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService
  ) { }

  login(credentials: Credentials): Observable<User> {
    return this.apiHttpService.post(this.apiEndpointsService.getAuthEndpoint(), credentials);
  }

}
