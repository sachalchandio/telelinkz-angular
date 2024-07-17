import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserType = createSelector(
  selectUserState,
  (state: UserState) => state.userType
);
