// google-sso.service.ts
import { Injectable } from '@angular/core';

declare var gapi: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleSsoService {
  private clientId = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
  private scope = ['profile', 'email'].join(' ');

  public auth2: any;

  constructor() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        scope: this.scope,
      });
    });
  }

  signIn(): Promise<any> {
    return this.auth2.signIn();
  }

  signOut(): void {
    this.auth2.signOut();
  }
}
