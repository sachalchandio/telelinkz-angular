import { createReducer, on } from '@ngrx/store';
import {
  loadSales,
  loadSalesSuccess,
  loadSalesFailure,
} from '../actions/sale.actions';
import { Sale } from '../models/sale.model';

export interface SaleState {
  sales: Sale[];
  loading: boolean;
  error: any;
}

export const initialState: SaleState = {
  sales: [],
  loading: false,
  error: null,
};

export const saleReducer = createReducer(
  initialState,
  on(loadSales, (state) => ({ ...state, loading: true })),
  on(loadSalesSuccess, (state, { sales }) => ({
    ...state,
    loading: false,
    sales,
  })),
  on(loadSalesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
