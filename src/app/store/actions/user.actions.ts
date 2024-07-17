import { createAction, props } from '@ngrx/store';

export const setUserType = createAction(
  '[User] Set User Type',
  props<{ userType: string }>()
);

export const clearUserType = createAction('[User] Clear User Type');
