import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PreloaderService } from './core/bootstrap/preloader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private preloader: PreloaderService) {}

  title = 'Angular app';

  ngOnInit() {}

  ngAfterViewInit() {
    this.preloader.hide();
  }
}
