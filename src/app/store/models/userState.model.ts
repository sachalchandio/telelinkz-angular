import { UserType } from 'src/generated/graphqlTypes';

export interface UserState {
  userType: UserType | null; // Allow null for initial state
}
