import { Injectable } from '@angular/core';
import { AuthService } from '../authentication/services/auth.service';
import { switchMap, tap } from 'rxjs';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { LoaderService } from '../../shared/services/loader.service';
import { MenuService } from '../services/menu.service';
import { IMenuSection, IMenuItem } from '../models/menu';
import { UserService } from '../authentication/services/user.service';
import { User, UserResponse } from '../authentication/models/auth';
import { get } from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(
    private authService: AuthService,
    private permissionsService: NgxPermissionsService,
    private rolesService: NgxRolesService,
    private loaderService: LoaderService,
    private menuService: MenuService,
    private userService: UserService
  ) {}

  load() {
    this.loaderService.isLoading.next(true);
    return new Promise<void>((resolve) => {
      this.loaderService.isLoading.next(true);

      if (this.authService.isLoggedIn()) {
        this.authService
          .getCurrentUser()
          .pipe(
            tap((userResponse: UserResponse) =>
              this.userService.set(userResponse.data)
            ),
            tap((user) => this.setPermissions(user)),
            switchMap(() => this.authService.menu()),
            tap((menu) => this.setMenu(menu))
          )
          .subscribe({
            next: () => {
              this.loaderService.isLoading.next(false);
              resolve();
            },
            error: () => {
              this.loaderService.isLoading.next(false);
              resolve();
            },
          });
      } else {
        this.loaderService.isLoading.next(false);
        resolve();
      }
    });
  }

  private setMenu(menu: IMenuSection[] | IMenuItem[]) {
    // this.menuService.addNamespace(menu, 'menu');
    this.menuService.set(menu);
  }

  setPermissions(user: any) {
    if (get(user, 'data.roles')) {
      this.permissionsService.loadPermissions(user.data.roles);
      this.rolesService.flushRoles();
    } else {
      this.permissionsService.loadPermissions([]);
      this.rolesService.flushRoles();
    }
  }
}
