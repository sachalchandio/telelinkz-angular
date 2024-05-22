import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsernameService {
  private usernameSubject = new BehaviorSubject<string>(
    this.getUsernameFromLocalStorage()
  );

  username$ = this.usernameSubject.asObservable();

  constructor(private ngZone: NgZone) {
    window.addEventListener('storage', (event) => {
      if (event.key === 'agent') {
        this.ngZone.run(() => {
          this.usernameSubject.next(this.getUsernameFromLocalStorage());
        });
      }
    });
  }

  private getUsernameFromLocalStorage(): string {
    return localStorage.getItem('agent') || '';
  }

  updateUsername(username: string): void {
    localStorage.setItem('agent', username);
    this.ngZone.run(() => {
      this.usernameSubject.next(username);
    });
  }
}
