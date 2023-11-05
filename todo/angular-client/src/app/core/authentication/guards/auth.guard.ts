import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AppConstant } from '@shared/constants/app.constant';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenticate(state);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenticate(state);
  }

  private authenticate(state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      if (state.url.includes(AppConstant.PAGE.SIGN_IN_PAGE)) {
        this.router.navigate([`${AppConstant.PAGE.TODAY_PAGE}`]);
        return false;
      }
      return true;
    } else {
      if (
        state.url.includes(AppConstant.PAGE.SIGN_IN_PAGE) ||
        state.url.includes(AppConstant.PAGE.SIGN_UP_PAGE)
      ) {
        return true;
      }

      this.authService.redirectUrl = state.url; // Store the attempted URL for redirecting

      this.router.navigate([`${AppConstant.PAGE.SIGN_IN_PAGE}`]);

      return false;
    }
  }
}
