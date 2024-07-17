// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenKey = 'accessToken';
  private userTypeKey = 'userType';

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getUserType(): string | null {
    return localStorage.getItem(this.userTypeKey);
  }

  setUserType(userType: string): void {
    localStorage.setItem(this.userTypeKey, userType);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.clearToken();
  }
}
