import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { cols: 1, rows: 1, title: 'Card 1' },
          { cols: 1, rows: 1, title: 'Card 2' },
          { cols: 1, rows: 1, title: 'Card 3' },
          { cols: 1, rows: 1, title: 'Card 4' },
        ];
      }

      return [
        { cols: 2, rows: 1, title: 'Card 1' },
        { cols: 1, rows: 1, title: 'Card 2' },
        { cols: 1, rows: 2, title: 'Card 3' },
        { cols: 1, rows: 1, title: 'Card 4' },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
