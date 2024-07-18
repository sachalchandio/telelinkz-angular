import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserType } from 'src/generated/graphqlTypes';
import { selectUserType } from '../store/selectors/user.selectors';
import { AppState } from '../store/models/app.model';
import { select, Store } from '@ngrx/store';
import { setUserType } from '../store/actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userType$: Observable<UserType | null>;
  private tokenKey = 'accessToken';

  constructor(private store: Store<AppState>) {
    this.userType$ = this.store.pipe(select(selectUserType));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getUserType(): Observable<UserType | null> {
    return this.userType$;
  }

  setUserType(userType: UserType): void {
    this.store.dispatch(setUserType({ userType }));
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.clearToken();
  }
}
