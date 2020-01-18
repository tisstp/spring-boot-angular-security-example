import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStatus from 'src/app/store/auth/status/reducer';

export const selectStatusState = createFeatureSelector<fromStatus.State>(
  fromStatus.statusFeatureKey
);
