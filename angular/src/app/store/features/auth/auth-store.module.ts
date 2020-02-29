import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers, { metaReducers: fromAuth.metaReducers }),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthStoreModule {}
