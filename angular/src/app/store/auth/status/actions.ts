import { createAction, props } from '@ngrx/store';

export const loadStatus = createAction(
  '[Status] Load Status'
);

export const loadStatusSuccess = createAction(
  '[Status] Load Status Success',
  props<{ data: any }>()
);

export const loadStatusFailure = createAction(
  '[Status] Load Status Failure',
  props<{ error: any }>()
);
