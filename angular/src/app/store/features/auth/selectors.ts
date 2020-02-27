import { createFeatureSelector } from '@ngrx/store';
import * as fromAuth from 'src/app/store/features/auth/reducers';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(fromAuth.authFeatureKey);
