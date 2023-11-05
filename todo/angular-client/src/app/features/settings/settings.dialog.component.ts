import {
    TemplateRef,
    Component,
    OnDestroy,
    ViewChild,
    OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

import { SettingsComponent } from './settings.component';

@Component({
    selector: 'app-setting-dialog',
    template: `
        <ng-template>
            <router-outlet></router-outlet>
        </ng-template>
    `,
})
export class SettingsDialogComponent implements OnDestroy, OnInit {
    destroy = new Subject<any>();
    @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<any>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.openDialog();
    }

    openDialog() {
        const dialogRef = this.dialog.open(SettingsComponent, {
            disableClose: false,
            minWidth: '1060px',
        });

        dialogRef.componentInstance.contentTemplate = this.templateRef;

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log('p');
            } else {
                this.destroy.next('');
            }
        });
    }

    ngOnDestroy(): void {
        console.log('SettingsDialogComponent ngOnDestroy');
        this.destroy.next('');
    }
}
