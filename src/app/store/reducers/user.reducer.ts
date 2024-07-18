import { createReducer, on } from '@ngrx/store';
import { setUserType, clearUserType } from '../actions/user.actions';
import { UserState } from '../models/userState.model';

export const initialState: UserState = {
  userType: null,
};

export const userReducer = createReducer(
  initialState,
  on(setUserType, (state, { userType }) => ({ ...state, userType })),
  on(clearUserType, (state) => ({ ...state, userType: null }))
);
