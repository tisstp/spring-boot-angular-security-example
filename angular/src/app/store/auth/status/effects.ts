import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import * as StatusActions from 'src/app/store/auth/status/actions';


@Injectable()
export class StatusEffects {

  loadStatuss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StatusActions.loadStatus),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => StatusActions.loadStatusSuccess({ data })),
          catchError(error => of(StatusActions.loadStatusFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}

}
