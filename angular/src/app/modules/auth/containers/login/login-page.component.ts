import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Logger } from '@shared/classes';

const log = new Logger('LoginPageComponent');

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    log.debug('login');
    this.router.navigate(['home', 'welcome']);
  }
}
