import { createReducer, on, Action } from '@ngrx/store';
import { setSaleDetails } from '../actions/sale.actions';
import { Sale } from '../models/sale.model';

export interface SaleState {
  saleDetails: Sale | null;
}

export const initialState: SaleState = {
  saleDetails: null,
};

const _saleReducer = createReducer(
  initialState,
  on(setSaleDetails, (state, { saleDetails }) => ({ ...state, saleDetails }))
);

export function saleReducer(state: SaleState | undefined, action: Action) {
  return _saleReducer(state, action);
}
