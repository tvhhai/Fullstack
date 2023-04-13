import { Directive } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {SidebarListService} from "../../../../services/sidebar-list.service";
import {filter} from "rxjs/operators";
import {NavAccordionItemDirective} from "./nav-accordion-item.directive";

@Directive({
  selector: '[appNavAccordion]'
})
export class NavAccordionDirective {

  protected navLinks: NavAccordionItemDirective[] = [];
  constructor(private router: Router, private menu: SidebarListService) {
    this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => this.checkOpenLinks());

    // Fix opening status for async menu data
    setTimeout(() => this.checkOpenLinks());
  }
  addLink(link: NavAccordionItemDirective) {
    // console.log(link)
    this.navLinks.push(link);
  }

  removeLink(link: NavAccordionItemDirective) {
    const index = this.navLinks.indexOf(link);
    if (index !== -1) {
      this.navLinks.splice(index, 1);
    }
  }
  private checkOpenLinks() {
    this.navLinks.forEach(link => {
      // console.log('checkOpenLinks',   link.route, this.router.url.split('/').includes(link.route), this.router.url.split('/') )

      // console.log(link, link.route)
      if (link.route) {
        if (this.router.url.split('/').includes(link.route)) {
          link.expanded = true;
          this.closeOtherLinks(link);
        }
      }
    });
  }

  closeOtherLinks(openLink: NavAccordionItemDirective) {
    this.navLinks.forEach(link => {
      if (link !== openLink) {
        link.expanded = false;
      }
    });
  }

}
