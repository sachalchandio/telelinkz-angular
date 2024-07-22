import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../models/userState.model';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserType = createSelector(
  selectUserState,
  (state: UserState) => state.userType
);
