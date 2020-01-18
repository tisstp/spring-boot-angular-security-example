import { environment } from '@env/environment';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

export interface RootState {
  router: fromRouter.RouterReducerState;
}

export const reducers: ActionReducerMap<RootState> = {
  router: fromRouter.routerReducer,
};


export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];
