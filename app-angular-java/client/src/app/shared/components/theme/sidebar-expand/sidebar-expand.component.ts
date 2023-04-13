import { Component, Input, ViewEncapsulation } from '@angular/core';
import {
  animate,
  query,
  sequence,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-sidebar-expand',
  templateUrl: './sidebar-expand.component.html',
  styleUrls: ['./sidebar-expand.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('dropDownMenu', [
      transition(':enter', [
        style({ height: 0, overflow: 'hidden' }),
        query(
          '.expand-sub-menu',
          [style({ opacity: 0, transform: 'translateY(-50px)' })],
          { optional: true }
        ),
        sequence([
          animate('200ms', style({ height: '*' })),
          query(
            '.expand-sub-menu',
            [
              stagger(-50, [
                animate('400ms ease', style({ opacity: 1, transform: 'none' })),
              ]),
            ],
            { optional: true }
          ),
        ]),
      ]),

      transition(':leave', [
        style({ height: '*', overflow: 'hidden' }),
        query('.expand-sub-menu', [style({ opacity: 1, transform: 'none' })], {
          optional: true,
        }),
        sequence([animate('200ms', style({ height: 0 }))]),
      ]),
    ]),
  ],
})
export class SidebarExpandComponent {
  @Input() data!: any;
  @Input() index!: number;
  @Input() level!: number;

  open: boolean = false;

  // constructor(private router: Router, private menu: SidebarListService) {
  //   this.router.events
  //       .pipe(filter(event => event instanceof NavigationEnd))
  //       .subscribe(() => this.checkOpenLinks());
  //
  //   // Fix opening status for async menu data
  //   // this.menu.change().subscribe(() => {
  //   //   setTimeout(() => this.checkOpenLinks());
  //   // });
  // }

  //
  // ngOnInit() {
  //   this.checkOpenLinks();
  // }

  openDropdown() {
    this.open = !this.open;
  }

  closeDropdown() {
    this.open = false;
  }
}
