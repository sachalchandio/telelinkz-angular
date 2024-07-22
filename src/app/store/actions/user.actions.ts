import { createAction, props } from '@ngrx/store';
import { UserType } from 'src/generated/graphqlTypes';

export const setUserType = createAction(
  '[User] Set UserType',
  props<{ userType: UserType }>()
);

export const clearUserType = createAction('[User] Clear UserType');
