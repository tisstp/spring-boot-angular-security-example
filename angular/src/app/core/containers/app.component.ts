import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { Logger } from '@shared/classes/logger';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.setupLogger();
  }

  private setupLogger() {
    if (environment.production) {
      Logger.enableProductionMode();
    }
    log.debug('init');
  }
}
