import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { NavigationActionTiming, RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { META_REDUCERS, StoreModule } from '@ngrx/store';
import { localStorageKeyName, storageKeysToSave } from 'src/app/config/store.config';
import { ROOT_LOCAL_STORAGE_KEY, ROOT_STORAGE_KEYS } from 'src/app/core/app.tokens';
import { LocalStorageService } from 'src/app/core/services';
import { RootEffects } from 'src/app/store/effects';
import { AuthStoreModule } from 'src/app/store/features/auth';
import { metaReducerFactory } from 'src/app/store/functions';
import { metaReducers, reducers } from 'src/app/store/reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,

        /** RouterState.Full isn't compatible with these runtime checks */
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,

      /** action to be dispatched after guards and resolvers successfully ran and the new route will be activated. */
      navigationActionTiming: NavigationActionTiming.PostActivation
    }),

    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://ngrx.io/guide/effects#registering-root-effects
     */
    EffectsModule.forRoot([RootEffects]),

    AuthStoreModule
  ],
  providers: [
    { provide: ROOT_STORAGE_KEYS, useValue: storageKeysToSave },
    { provide: ROOT_LOCAL_STORAGE_KEY, useValue: localStorageKeyName },
    {
      provide: META_REDUCERS,
      deps: [ROOT_STORAGE_KEYS, ROOT_LOCAL_STORAGE_KEY, LocalStorageService],
      useFactory: metaReducerFactory,
      multi: true
    }
  ]
})
export class RootStoreModule {}
