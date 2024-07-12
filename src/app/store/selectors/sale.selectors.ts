import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SaleState } from '../reducers/sale.reducer';

export const selectSaleState = createFeatureSelector<SaleState>('sales');

export const selectAllSales = createSelector(
  selectSaleState,
  (state: SaleState) => state.sales
);
export const selectSalesLoading = createSelector(
  selectSaleState,
  (state: SaleState) => state.loading
);
export const selectSalesError = createSelector(
  selectSaleState,
  (state: SaleState) => state.error
);
