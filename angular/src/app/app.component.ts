import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { Logger } from 'src/app/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
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
    private authService: AuthenticationService,
    private exampleService: ExampleService
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
    this.authService.withCsrfIgnore(this.request).subscribe((val) => {
      log.debug('res:', val);
    });
  }

  onWithCsrf() {
    log.debug('onWithCsrf');
    this.exampleService.withCsrfXsrf(this.request).subscribe((val) => {
      log.debug('res:', val);
    });
  }

}
