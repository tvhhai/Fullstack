import { AfterViewInit, Directive, ElementRef, HostListener, Inject, Renderer2 } from "@angular/core";
import { NavAccordionItemDirective } from "./nav-accordion-item.directive";

@Directive({
    selector: "[appNavAccordionToggle]",
})
export class NavAccordionToggleDirective implements AfterViewInit {
    protected navLink: NavAccordionItemDirective;

    constructor(
        @Inject(NavAccordionItemDirective) navLink: NavAccordionItemDirective,
        private el: ElementRef,
        private renderer: Renderer2,
    ) {
        this.navLink = navLink;
    }

    ngOnInit() {
    }


    ngAfterViewInit() {
        this.addClickEvent();
    }


    addClickEvent() {
        const targetElement = this.el.nativeElement.querySelector(".menu-caret");
        this.renderer.listen(targetElement, "click", () => {
            this.navLink.toggle();
        });
    }
}
