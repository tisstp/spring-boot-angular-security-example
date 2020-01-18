import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
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
    // return this.apiHttpService.post(this.apiEndpointsService.getAuthEndpoint(), credentials);

    if (credentials.username !== 'test' && credentials.username !== 'ngrx') {
      return throwError('Invalid username or password');
    }

    const user: User = {
      token: btoa('sathaphorn.s'),
      name: 'sathaphorn sunthornpan'
    };
    return of(user);
  }

}
