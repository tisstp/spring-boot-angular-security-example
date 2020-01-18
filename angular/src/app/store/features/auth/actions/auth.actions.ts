import { Credentials, User } from '@modules/auth/models';
import { createAction, props } from '@ngrx/store';

/* login page */
export const login = createAction('[Login Page] Login', props<Credentials>());


/* auth api */
export const loginSuccess = createAction('[Auth/API] Login Success', props<{ user: User }>());
export const loginFailure = createAction('[Auth/API] Login Failure', props<{ error: string }>());
export const loginRedirect = createAction('[Auth/API] Login Redirect');


/* auth */
export const logout = createAction('[Auth] Logout');
export const logoutConfirmation = createAction('[Auth] Logout Confirmation');
export const logoutConfirmationDismiss = createAction('[Auth] Logout Confirmation Dismiss');

