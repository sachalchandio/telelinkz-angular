import { createReducer, on } from '@ngrx/store';
import { setUserType, clearUserType } from '../actions/user.actions';

export interface UserState {
  userType: string | null;
}

export const initialState: UserState = {
  userType: null,
};

export const userReducer = createReducer(
  initialState,
  on(setUserType, (state, { userType }) => ({ ...state, userType })),
  on(clearUserType, (state) => ({ ...state, userType: null }))
);
