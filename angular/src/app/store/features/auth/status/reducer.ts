import { User } from '@modules/auth/models';
import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './actions';

export const statusFeatureKey = 'status';

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

const authReducer = createReducer(
  initialState,

  on(AuthActions.login, () => initialState),
  on(AuthActions.loginSuccess, (state, action) => ({
    isAuthenticated: true,
    user: {
      token: action.user.token
    },
    errorMessage: null
  })),
  on(AuthActions.loginFailure, (state, action) => ({
    ...state,
    errorMessage: action.error ? action.error : 'Incorrect username and/or password.'
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
