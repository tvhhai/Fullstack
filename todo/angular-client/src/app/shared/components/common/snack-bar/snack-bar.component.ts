import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
  // MatSnackBar,
} from '@angular/material/snack-bar';
import {
  ViewEncapsulation,
  EventEmitter,
  Component,
  Inject,
  Output,
} from '@angular/core';
import { IDataSnackbar } from '@shared/components/common/snack-bar/snack-bar.model';
import { noop } from 'rxjs';

// import { SnackBarService } from '@shared/components/common/snack-bar/snack-bar.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-snack-bar',
  styleUrls: ['./snack-bar.component.scss'],
  templateUrl: './snack-bar.component.html',
})
export class SnackBarComponent {
  @Output() syncData = new EventEmitter();

  constructor(
    // private _snackBar: MatSnackBar,
    private _snackRef: MatSnackBarRef<SnackBarComponent>,
    // private snackBarService: SnackBarService,
    @Inject(MAT_SNACK_BAR_DATA) public data: IDataSnackbar
  ) {}

  dismiss() {
    this._snackRef.dismiss();
  }

  doAction() {
    this.data.action ? this.data.action() : noop();
    this.dismiss();
  }
}
