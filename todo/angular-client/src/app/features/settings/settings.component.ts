import {
    ViewEncapsulation,
    TemplateRef,
    Component,
    OnDestroy,
    Inject,
} from '@angular/core';
import { DataDialog } from '@shared/components/common/dialog/dialog.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '@core/authentication/services/user.service';
import { NavigationEnd, Router } from '@angular/router';
import { AppConstant } from '@shared/constants';
import { isEmptyObj } from '@shared/helpers';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-settings',
    styleUrls: ['./settings.component.scss'],
    templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnDestroy {
    contentTemplate!: TemplateRef<any>;
    title!: string;

    settingMenus = [
        {
            icon: 'fa-light fa-circle-user fa-lg',
            router: 'account',
            title: 'setting.account.title',
        },
        {
            icon: 'fa-light fa-gear  fa-lg',
            router: 'general',
            title: 'setting.general.title',
        },
        {
            icon: 'fa-light fa-palette  fa-lg',
            router: 'theme',
            title: 'setting.theme.title',
        },
        {
            icon: 'fa-light fa-sidebar  fa-lg',
            router: 'sidebar',
            title: 'setting.sidebar.title',
        },
    ];

    constructor(
        private router: Router,
        private userService: UserService,
        @Inject(MAT_DIALOG_DATA) public data: DataDialog,
        public dialogRef: MatDialogRef<SettingsComponent>
    ) {
        const routerSegments = this.router.url.slice(1).split('/');
        this.setTitleBasedOnRouter(routerSegments);

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (event.url) {
                    const routerArr = this.router.url.slice(1).split('/');
                    this.setTitleBasedOnRouter(routerArr);
                }
            }
        });
    }

    setTitleBasedOnRouter(routerSegments: string[]) {
        const targetRoute = this.getNameFromRouterSegments(routerSegments);
        const matchingMenu = this.settingMenus.find(
            menuItem => menuItem.router === targetRoute
        );

        if (matchingMenu && !isEmptyObj(matchingMenu)) {
            this.title = matchingMenu.title;
        }
    }

    getNameFromRouterSegments(routerArr: string[]) {
        return routerArr[routerArr.length - 1];
    }

    onConfirmClick(): void {
        this.dialogRef.close(true);
    }

    onCancelClick(): void {
        const shouldCloseDialog = false;
        this.dialogRef.close(shouldCloseDialog);

        const backUrl = this.userService.backToUrlAfterCloseSettingDialog
            ? this.userService.backToUrlAfterCloseSettingDialog
            : AppConstant.PAGE.TODAY_PAGE;

        this.router.navigate([backUrl]);
    }

    ngOnDestroy(): void {
        console.log('SettingsComponent ngOnDestroy');
    }
}
