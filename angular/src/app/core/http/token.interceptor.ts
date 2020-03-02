import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = {
      // 'Access-Control-Allow-Origin': environment.endpoints.allowOrigin,
      Authorization: 'Basic ' + btoa('user1:user1Pass')
    };
    req = req.clone({ setHeaders: headers });
    return next.handle(req);
  }
}
