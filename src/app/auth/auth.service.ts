import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
  private tokenKey = 'accessToken';
  private loginDataKey = 'loginData';

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.loginDataKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.clearToken();
    localStorage.clear();
  }
}
