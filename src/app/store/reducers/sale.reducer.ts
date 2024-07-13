import { createReducer, on, Action } from '@ngrx/store';
import { setSaleDetails } from '../actions/sale.actions';

export interface SaleState {
  saleDetails: any;
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
