import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectUserType } from '../store/selectors/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const expectedUserType = route.data['expectedUserType'];
    return this.store.select(selectUserType).pipe(
      take(1),
      map((userType) => {
        if (userType && userType === expectedUserType) {
          return true;
        } else {
          // Redirect to login page
          return this.router.createUrlTree(['/login'], {
            queryParams: { returnUrl: state.url },
          });
        }
      })
    );
  }
}
