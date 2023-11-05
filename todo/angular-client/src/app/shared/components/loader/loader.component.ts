import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  styleUrls: ['./loader.component.scss'],
  templateUrl: './loader.component.html',
  // encapsulation: ViewEncapsulation.None
})
export class LoaderComponent implements OnDestroy {
  isShowLoading = false;
  subscription: Subscription;

  constructor(private loaderService: LoaderService) {
    this.subscription = this.loaderService.isLoading.subscribe(value => {
      this.isShowLoading = value;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
