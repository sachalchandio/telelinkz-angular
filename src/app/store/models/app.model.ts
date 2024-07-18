import { SaleState } from '../reducers/sale.reducer';
import { UserState } from './userState.model';

export interface AppState {
  user: UserState;
  // Add other states here
  sale: SaleState;
}
