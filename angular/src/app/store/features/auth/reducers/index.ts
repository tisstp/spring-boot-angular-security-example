import { environment } from '@env/environment';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromRoot from 'src/app/store/reducers';
import * as fromAuth from './auth.reducer';

export const authFeatureKey = 'auth';

export interface State extends fromRoot.RootState {
  [authFeatureKey]: AuthState;
}

export interface AuthState {
  [fromAuth.statusFeatureKey]: fromAuth.State;
}

export const reducers: ActionReducerMap<AuthState> = {
  [fromAuth.statusFeatureKey]: fromAuth.reducer,
};


export const metaReducers: MetaReducer<AuthState>[] = !environment.production ? [] : [];
