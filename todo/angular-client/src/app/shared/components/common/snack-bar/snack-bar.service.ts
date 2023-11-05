import { SnackBarComponent } from '@shared/components/common/snack-bar/snack-bar.component';
import { IDataSnackbar } from '@shared/components/common/snack-bar/snack-bar.model';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  private defaultConfiguration: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'start',
    panelClass: 'app-snackbar',
    verticalPosition: 'bottom',
  };

  open(data: IDataSnackbar, config?: MatSnackBarConfig) {
    const matSnackBarConfig = config ?? this.defaultConfiguration;
    data.dismiss = data.dismiss !== undefined ? data.dismiss : true;
    this.snackBar.openFromComponent(SnackBarComponent, {
      data,
      ...matSnackBarConfig,
    });
  }
}
