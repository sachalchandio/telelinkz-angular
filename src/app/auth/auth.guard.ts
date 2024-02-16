import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthenticationService } from './auth.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../modules/login/components';

@Injectable()
export class AuthGuard {
  constructor(
    private authService: AuthenticationService,
    private dialog: MatDialog
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      const dialogRef = this.dialog.open(LoginComponent, {
        data: {
          returnUrl: state.url, // Pass the current URL as data to the dialog
        },
      });
      return false;
    }
  }
}
