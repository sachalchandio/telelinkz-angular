import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { selectUserType } from 'src/app/store/selectors/user.selectors';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class UsernameService {
  private usernameSubject = new BehaviorSubject<string>(
    this.getUsernameFromLocalStorage()
  );

  username$ = this.usernameSubject.asObservable();

  constructor(private ngZone: NgZone, private store: Store) {
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

  // In your service
  getUserType() {
    return this.store.select(selectUserType).pipe(
      take(1),
      map((userType) => userType || false)
    );
  }
}
