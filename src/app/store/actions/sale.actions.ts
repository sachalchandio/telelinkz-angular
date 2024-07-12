import { createAction, props } from '@ngrx/store';
import { Sale } from '../models/sale.model';

export const loadSales = createAction('[Sale] Load Sales');

export const loadSalesSuccess = createAction(
  '[Sale] Load Sales Success',
  props<{ sales: Sale[] }>()
);
export const loadSalesFailure = createAction(
  '[Sale] Load Sales Failure',
  props<{ error: any }>()
);
