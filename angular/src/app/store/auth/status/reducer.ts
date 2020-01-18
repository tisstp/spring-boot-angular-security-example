import { Action, createReducer, on } from '@ngrx/store';
import * as StatusActions from 'src/app/store/auth/status/actions';

export const statusFeatureKey = 'status';

export interface State {

}

export const initialState: State = {};

const statusReducer = createReducer(
  initialState,

  on(StatusActions.loadStatus, state => state),
  on(StatusActions.loadStatusSuccess, (state, action) => state),
  on(StatusActions.loadStatusFailure, (state, action) => state),
);

export function reducer(state: State | undefined, action: Action) {
  return statusReducer(state, action);
}
