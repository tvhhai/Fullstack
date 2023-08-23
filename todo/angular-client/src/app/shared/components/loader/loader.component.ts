import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class LoaderComponent {
  isShowLoading: boolean = false;
  subscription: Subscription;

  constructor(private loaderService: LoaderService) {
    this.subscription = this.loaderService.isLoading.subscribe((value) => {
      this.isShowLoading = value;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
