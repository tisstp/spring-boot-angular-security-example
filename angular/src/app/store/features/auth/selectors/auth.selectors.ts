import { createSelector } from '@ngrx/store';
import { statusFeatureKey } from 'src/app/store/features/auth/reducers/auth.reducer';
import { selectAuthState } from 'src/app/store/features/auth/selectors/index';


export const selectStatusState = createSelector(selectAuthState, (state) => state[statusFeatureKey]);

export const getErrorMessage = createSelector(selectStatusState, (state) => state.errorMessage);
