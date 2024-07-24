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
import { UsernameService } from '../services/loginInfo/username.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private readonly userService: UsernameService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // const expectedUserType = route.data['expectedUserType'];
    // return this.userService.getUserType().pipe(
    //   map((userType) => {
    //     if (userType) {
    //       console.log('User Type:', userType);
    //       return true;
    //     } else {
    //       // Redirect to login page
    //       return this.router.createUrlTree(['/unauthorized'], {
    //         queryParams: { returnUrl: state.url },
    //       });
    //     }
    //   })
    // );
    return true;
  }
}
