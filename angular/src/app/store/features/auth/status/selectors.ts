import { createSelector } from '@ngrx/store';
import { selectAuthState } from 'src/app/store/features/auth/selectors';
import { statusFeatureKey } from './reducer';

export const selectStatusState = createSelector(selectAuthState, state => state[statusFeatureKey]);

export const getErrorMessage = createSelector(selectStatusState, state => state.errorMessage);
