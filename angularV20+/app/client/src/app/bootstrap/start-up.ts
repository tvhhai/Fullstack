import { Injectable } from "@angular/core";
import { AuthService } from "@core/authentication/services/auth.service";
import { NgxPermissionsService, NgxRolesService } from "ngx-permissions";
import { LoaderService } from "@shared/services/loader.service";
import { MenuService } from "@layout/menu/menu.service";
import { UserService } from "@core/authentication/services/user.service";
import { firstValueFrom, tap } from "rxjs";
import { User, UserResponse } from "@core/authentication/models/auth";
import { get } from "lodash";

@Injectable({
    providedIn: "root"
})
export class StartUp {
    constructor(
        private authService: AuthService,
        // private permissionsService: NgxPermissionsService,
        // private rolesService: NgxRolesService,
        private loaderService: LoaderService,
        private menuService: MenuService,
        private userService: UserService
    ) {
    }

    load() {
        return new Promise<void>((resolve) => {
            // this.loaderService.isLoading.next(true);

            if (this.authService.isLoggedIn()) {
                this.authService
                    .getCurrentUser()
                    .pipe(
                        tap((res: UserResponse) => this.userService.set(res.data)),
                        tap((res: UserResponse) => this.setPermissions(res.data)),
                        // switchMap(() => this.authService.getConditionalMenu()),
                        // tap((menu) => this.setMenu(menu))
                    )
                    .subscribe({
                        next: () => {
                            // this.loaderService.isLoading.next(false);
                            resolve();
                        },
                        error: () => {
                            // this.loaderService.isLoading.next(false);
                            resolve();
                        }
                    });
            } else {
                // this.loaderService.isLoading.next(false);
                resolve();
            }
        });
    }


    private setMenu(menu: any) {
        console.log(menu);
        this.menuService.set(menu);
    }

    setPermissions(user: User) {
        // console.log(user);
        // if (get(user, "roles")) {
        //     this.permissionsService.loadPermissions(user.roles);
        // } else {
        //     this.permissionsService.loadPermissions([]);
        // }
        // this.rolesService.flushRoles();
    }
}
