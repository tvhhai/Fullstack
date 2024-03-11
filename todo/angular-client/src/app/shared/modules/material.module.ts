import {
    MAT_RIPPLE_GLOBAL_OPTIONS,
    MatNativeDateModule,
    MAT_DATE_FORMATS,
    MatRippleModule,
    MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
    MAT_DIALOG_DEFAULT_OPTIONS,
    MatDialogConfig,
    MatDialogModule,
} from '@angular/material/dialog';
import {
    MatPaginatorModule,
    // MatPaginatorIntl,
} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { NgModule } from '@angular/core';
// import { MatMomentDateModule } from '@angular/material-moment-adapter';
//
// import { PaginatorI18nService } from '@shared/services/paginator-i18n.service';

@NgModule({
    exports: [
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        // MatMomentDateModule,
        MatNativeDateModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
    ],
    providers: [
        // {
        //   provide: MatPaginatorIntl,
        //   deps: [PaginatorI18nService],
        //   useFactory: (paginatorI18nSrv: PaginatorI18nService) => paginatorI18nSrv.getPaginatorIntl(),
        // },
        {
            provide: MAT_RIPPLE_GLOBAL_OPTIONS,
            useValue: {
                animation: {
                    enterDuration: 0,
                    exitDuration: 0,
                },
                disabled: true,
            },
        },
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                ...new MatDialogConfig(),
                autoFocus: false,
                disableClose: true,
                hasBackdrop: true,
                // maxWidth: '500px',
                minWidth: '500px',
                position: {
                    top: `100px`,
                },
                // width: '100%',
            },
        },
        {
            provide: MAT_DATE_LOCALE,
            useFactory: () => navigator.language, // <= This will be overrided by runtime setting
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                display: {
                    dateA11yLabel: 'LL',
                    dateInput: 'YYYY-MM-DD',
                    monthYearA11yLabel: 'YYYY MMM',
                    monthYearLabel: 'YYYY MMM',
                },
                parse: {
                    dateInput: 'YYYY-MM-DD',
                },
            },
        },
    ],
})
export class MaterialModule {}
