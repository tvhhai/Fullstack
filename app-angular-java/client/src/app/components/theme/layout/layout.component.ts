import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, Input, OnDestroy, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  opened!:boolean;

  constructor(private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.breakpointObserver.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        if (this.sidenav.mode !== 'over') {
          this.sidenav.close();
          this.sidenav.mode = 'over';
        }
      } else {
        if (this.sidenav.mode !== 'side') {
          this.sidenav.open();
          this.sidenav.mode = 'side';
        }
      }
      this.setIsOpenSidebar(this.sidenav.opened);
      this.cdr.detectChanges();
    });
  }

  toggleSideNav() {
    this.sidenav.toggle();
    this.setIsOpenSidebar(this.sidenav.opened);
  }

  setIsOpenSidebar(opened: boolean) {
    this.opened = opened;
  }

}
