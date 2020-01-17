import { environment } from '@env/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


/**
 * Excluding Store Devtools In Production
 * Ref. https://next.ngrx.io/guide/store-devtools/recipes/exclude
 */
export const extModules = [
  /**
   * Store devtools instrument the store retaining past versions of state
   * and recalculating new states. This enables powerful time-travel
   * debugging.
   *
   * To use the debugger, install the Redux Devtools extension for either
   * Chrome or Firefox
   *
   * See: https://github.com/zalmoxisus/redux-devtools-extension
   */
  StoreDevtoolsModule.instrument({
    name: 'My Angular Store App',
    maxAge: 25,
    logOnly: environment.production
  })
];
