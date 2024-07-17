import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SaleState } from '../reducers/sale.reducer';

export const selectSaleFeature = createFeatureSelector<SaleState>('sale');

export const selectSaleDetails = createSelector(
  selectSaleFeature,
  (state: SaleState) => state.saleDetails
);
