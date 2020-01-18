import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Logger } from '@shared/classes';
import { AuthActions } from 'src/app/store/features/auth/actions';
import * as fromAuth from 'src/app/store/features/auth/reducers';
import * as AuthSelectors from 'src/app/store/features/auth/selectors/auth.selectors';

const log = new Logger('LoginPageComponent');

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  username: string;
  loginError$ = this.store.pipe(select(AuthSelectors.getErrorMessage));

  constructor(
    private router: Router,
    private store: Store<fromAuth.State>,
  ) { }

  ngOnInit() {
  }

  login() {
    log.debug('login', this.username);
    // this.router.navigate(['home', 'welcome']);
    this.store.dispatch(AuthActions.login({ username: this.username, password: 'pass' }));
  }
}
