import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
} from '@angular/core';

import {SidebarListService} from 'src/app/services/sidebar-list.service';
import {SidebarItem} from '../../../../models/sidebar-item';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None,

})
export class SidebarComponent {
    @Input() showToggle = true;
    @Input() showUser = true;
    @Input() showHeader = true;
    @Input() toggleChecked = false;

    @Output() toggleCollapsed = new EventEmitter<void>();

    sidebarItems: SidebarItem[] | undefined;

    constructor(private router: Router, private sidebarService: SidebarListService) {
        // this.router.events
        //     .pipe(filter(event => event instanceof NavigationEnd))
        //     .subscribe(() => this.checkOpenLinks());

        // Fix opening status for async menu data
        // this.menu.change().subscribe(() => {
        //   setTimeout(() => this.checkOpenLinks());
        // });
    }

    ngOnInit() {
        this.sidebarItems = this.sidebarService.getSidebarItems();
        // console.log(this.sidebarItems);
    }

    // checkOpenLinks() {
    //     let navLinks = this.sidebarService.getSidebarItems();
    //     console.log(navLinks)
    //     navLinks.forEach(link => {
    //         console.log(link)
    //         if (link.route) {
    //             if (this.router.url.split('/').includes(link.route)) {
    //                 // link.expanded = true;
    //                 // this.closeOtherLinks(link);
    //             }
    //         }
    //     });
    // }


}
