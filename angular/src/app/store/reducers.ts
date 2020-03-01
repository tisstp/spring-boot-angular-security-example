import { environment } from '@env/environment';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { debugStore } from 'src/app/store/functions';

// tslint:disable-next-line:no-empty-interface
export interface RootState {
  // router: fromRouter.RouterReducerState;
}

export const reducers: ActionReducerMap<RootState> = {
  // router: fromRouter.routerReducer
};

export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [debugStore] : [];
