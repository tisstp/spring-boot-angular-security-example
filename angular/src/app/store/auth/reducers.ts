import { environment } from '@env/environment';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromStatus from 'src/app/store/auth/status/reducer';

export const authFeatureKey = 'auth';

export interface State {
  [fromStatus.statusFeatureKey]: fromStatus.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromStatus.statusFeatureKey]: fromStatus.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
