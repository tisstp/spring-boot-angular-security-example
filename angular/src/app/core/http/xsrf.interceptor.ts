import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logger } from '@shared/classes/logger';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

const log = new Logger('XsrfInterceptor');

@Injectable({
  providedIn: 'root'
})
export class XsrfInterceptor implements HttpInterceptor {
  constructor(private tokenExtractor: HttpXsrfTokenExtractor, private cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenExtractor.getToken() as string;
    log.debug('token', token);

    // this.cookieService.set( 'Test', 'Hello World' );
    const cookies = this.cookieService.getAll();
    log.debug('cookies: ', cookies);

    if (token !== null) {
      const headers = req.headers;
      log.debug(req.headers);
      // headers.delete('Cookie');
      // headers.delete('X-XSRF-TOKEN');
      // log.debug(headers.keys());
      // req = req.clone({ headers });
      //   req = req.clone({ setHeaders: { 'X-XSRF-TOKEN': token } });
    }
    return next.handle(req);
  }
}
