import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from '@modules/auth/models';
import { AuthService } from '@modules/auth/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import * as AuthActions from 'src/app/store/features/auth/status/actions';


@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}


  login$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((auth: Credentials) =>
        this.authService.login(auth).pipe(
          map(data => AuthActions.loginSuccess({ user: data })),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => this.router.navigate(['home', 'welcome']))
    ),
    { dispatch: false }
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginRedirect, AuthActions.logout),
        tap(authed => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

}
