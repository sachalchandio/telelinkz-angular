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
  constructor(private router: Router, private user ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const expectedUserType = route.data['expectedUserType'];
    return .getUserType().pipe(
      map((userType) => {
        if (userType) {
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
