import { createAction, props } from '@ngrx/store';

export const setSaleDetails = createAction(
  '[Sale] Set Sale Details',
  props<{ saleDetails: any }>()
);
