import {
    AfterViewInit,
    ElementRef,
    Directive,
    Renderer2,
    Inject,
    OnInit,
} from '@angular/core';

import { NavAccordionItemDirective } from './nav-accordion-item.directive';

@Directive({
    selector: '[appNavAccordionToggle]',
})
export class NavAccordionToggleDirective implements AfterViewInit, OnInit {
    protected navLink: NavAccordionItemDirective;

    constructor(
        @Inject(NavAccordionItemDirective) navLink: NavAccordionItemDirective,
        private el: ElementRef,
        private renderer: Renderer2
    ) {
        this.navLink = navLink;
    }

    ngOnInit() {
        console.log();
    }

    ngAfterViewInit() {
        this.addClickEvent();
    }

    addClickEvent() {
        const targetElement =
            this.el.nativeElement.querySelector('.menu-caret');
        this.renderer.listen(targetElement, 'click', () => {
            this.navLink.toggle();
        });
    }
}
