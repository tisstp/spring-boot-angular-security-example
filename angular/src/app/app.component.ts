import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { Logger } from '@shared/classes/logger';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ExampleService } from 'src/app/services/example.service';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular';

  request = {
    name: 'Sathaphorn',
    surname: 'Sunthornpan'
  };

  constructor(
    private authService: AuthService,
    private exampleService: ExampleService,
  ) {
  }

  ngOnInit(): void {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');
  }

  onWithoutCsrf() {
    log.debug('onWithoutCsrf');
    this.authService.withCsrfIgnore(this.request).subscribe((res: HttpResponse<any>) => {
      log.debug('response from server:', res);
      // log.debug('response headers', res.headers.keys());
    });
  }

  onWithCsrf() {
    log.debug('onWithCsrf');
    this.exampleService.withCsrfXsrf(this.request).subscribe((val) => {
      log.debug('res:', val);
    });
  }

  onHello() {
    log.debug('onHello');
    this.exampleService.hello(this.request).subscribe((val) => {
      log.debug('res:', val);
    });
  }

}
