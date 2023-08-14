import { Injectable } from "@angular/core";
import { AuthService } from "../authentication/services/auth.service";
import { switchMap, tap } from "rxjs";
import { NgxPermissionsService, NgxRolesService } from "ngx-permissions";
import { LoaderService } from "@shared/services/loader.service";
import { MenuService } from "../menu/menu.service";
import { IMenuItem } from "../menu/menu.model";
import { UserService } from "../authentication/services/user.service";
import { UserResponse } from "../authentication/models/auth";
import { get } from "lodash";

@Injectable({
    providedIn: "root"
})
export class StartupService {
    constructor(
        private authService: AuthService,
        private permissionsService: NgxPermissionsService,
        private rolesService: NgxRolesService,
        private loaderService: LoaderService,
        private menuService: MenuService,
        private userService: UserService
    ) {
    }

    load() {
        this.loaderService.isLoading.next(true);
        return new Promise<void>((resolve) => {
            this.loaderService.isLoading.next(true);

            if (this.authService.isLoggedIn()) {
                this.authService
                    .getCurrentUser()
                    .pipe(
                        tap((res: UserResponse) => this.userService.set(res.data)),
                        tap((res: UserResponse) => this.setPermissions(res.data)),
                        switchMap(() => this.authService.getConditionalMenu()),
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
                        }
                    });
            } else {
                this.loaderService.isLoading.next(false);
                resolve();
            }
        });
    }

    private setMenu(menu: IMenuItem[]) {
        this.menuService.set(menu);
    }


setPermissions(user: any) {
  if (get(user, "roles")) {
    this.permissionsService.loadPermissions(user.roles);
  } else {
    this.permissionsService.loadPermissions([]);
  }
  this.rolesService.flushRoles();
}
}
