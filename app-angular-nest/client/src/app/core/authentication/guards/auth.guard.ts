import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AppConstant } from '../../../constants/app.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenticate(state);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenticate(state);
  }

  private authenticate(state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      if (state.url.includes(AppConstant.PAGE.SIGN_IN_PAGE)) {
        this.router.navigate([`${AppConstant.PAGE.DASHBOARD_PAGE}`]);
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
