import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from 'src/app/store/auth/reducers';
import { StatusEffects } from 'src/app/store/auth/status/effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers, { metaReducers: fromAuth.metaReducers }),
    EffectsModule.forFeature([StatusEffects])
  ]
})
export class AuthStoreModule {
}
