import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './models/app.model';
import { userReducer } from './reducers/user.reducer';
import { saleReducer } from './reducers/sale.reducer';
// Import other reducers here

export const appReducers: ActionReducerMap<AppState> = {
  user: userReducer,
  sale: saleReducer,
};
