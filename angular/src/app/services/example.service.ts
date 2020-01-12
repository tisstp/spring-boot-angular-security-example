import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor(
    private http: HttpClient
  ) { }

  withCsrfXsrf(obj: any): Observable<any> {
    return this.http.post('/api/example', obj);
  }

  hello(obj: any): Observable<any> {
    return this.http.put('http://localhost:9000/api/hello', obj);
  }

}
