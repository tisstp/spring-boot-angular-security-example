import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Logger } from '@shared/classes';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ExampleService } from 'src/app/services/example.service';

const log = new Logger('WelcomePageComponent');

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  request = {
    name: 'Sathaphorn',
    surname: 'Sunthornpan'
  };

  constructor(
    private authService: AuthService,
    private exampleService: ExampleService,
    private router: Router
  ) { }

  ngOnInit() {}

  onWithoutCsrf() {
    log.debug('onWithoutCsrf');
    // this.authService.withCsrfIgnore(this.request).subscribe((res: HttpResponse<any>) => {
    //   log.debug('response from server:', res);
    //   // log.debug('response headers', res.headers.keys());
    // });
  }

  onWithCsrf() {
    log.debug('onWithCsrf');
    this.exampleService.withCsrfXsrf(this.request).subscribe(val => {
      log.debug('res:', val);
    });
  }

  onHello() {
    log.debug('onHello');
    this.exampleService.hello(this.request).subscribe(val => {
      log.debug('res:', val);
    });
  }

  logout() {
    log.debug('logout');
    this.router.navigate(['auth', 'login']);
  }
}
