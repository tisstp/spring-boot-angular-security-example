// factory meta-reducer configuration function
import { ActionReducer, MetaReducer } from '@ngrx/store';
import { Logger } from '@shared/classes';
import { merge, pick } from 'lodash-es';
import { LocalStorageService } from 'src/app/core/services';
import { RootState } from 'src/app/store/reducers';

const log = new Logger('storage.meta-reducer');

export function metaReducerFactory(
  saveKeys: string[],
  localStorageKey: string,
  storageService: LocalStorageService
): MetaReducer<RootState> {
  log.debug('metaReducerFactory: init');
  log.debug('metaReducerFactory: saveKeys', saveKeys);
  log.debug('metaReducerFactory: localStorageKey', localStorageKey);
  let onInit = true; // after load/refresh…

  return (reducer: ActionReducer<any>) => (state, action) => {
    // get to the nextState.
    const nextState = reducer(state, action);
    // init the application state.
    if (onInit) {
      onInit = false;
      const savedState = storageService.getSavedState(localStorageKey);
      log.debug('init the application state.', savedState);
      return merge(nextState, savedState);
    }

    // save the next state to the application storage.
    const stateToSave = pick(nextState, saveKeys);
    storageService.setSavedState(stateToSave, localStorageKey);

    return nextState;
  };
}
