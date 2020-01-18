import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { NavigationActionTiming, RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { AuthStoreModule } from 'src/app/store/auth';
import { RootEffects } from 'src/app/store/effects';
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
      navigationActionTiming: NavigationActionTiming.PostActivation,
    }),

    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://ngrx.io/guide/effects#registering-root-effects
     */
    EffectsModule.forRoot([RootEffects]),

    AuthStoreModule,
  ]
})
export class RootStoreModule {
}
