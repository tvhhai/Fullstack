import { Directive, ElementRef, HostListener, Inject, Renderer2 } from "@angular/core";
import { NavAccordionItemDirective } from "./nav-accordion-item.directive";

@Directive({
    selector: "[appNavAccordionToggle]",
})
export class NavAccordionToggleDirective {
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
        this.renderPasswordVisibilityToggle();
    }


    renderPasswordVisibilityToggle() {
        const targetElement = this.el.nativeElement.querySelector(".menu-caret");
        console.log(targetElement);
        this.renderer.listen(targetElement, "click", () => {
            this.navLink.toggle();
        });
    }

}
