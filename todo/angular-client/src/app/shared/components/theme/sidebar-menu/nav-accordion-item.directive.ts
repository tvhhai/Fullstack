import {
    HostBinding,
    Directive,
    OnDestroy,
    Inject,
    OnInit,
    Input,
} from '@angular/core';
import { IMenuChildrenItem } from '@core/menu/menu.model';

import { NavAccordionDirective } from './nav-accordion.directive';

@Directive({
    selector: '[appNavAccordionItem]',
})
export class NavAccordionItemDirective implements OnDestroy, OnInit {
    protected nav: NavAccordionDirective;
    protected isExpanded = true;

    @Input() route = '';
    @Input() child: IMenuChildrenItem[] = [];
    @Input() type: 'extTabLink' | 'extLink' | 'link' | 'sub' = 'link';

    @HostBinding('class.expanded')
    @Input()
    get expanded() {
        return this.isExpanded;
    }

    set expanded(value: boolean) {
        // Only sub menu can be expanded
        this.isExpanded = this.type === 'sub' && value;

        if (value) {
            this.nav.closeOtherLinks(this);
        }
    }

    constructor(@Inject(NavAccordionDirective) nav: NavAccordionDirective) {
        this.nav = nav;
    }

    ngOnInit() {
        this.nav.addLink(this);
    }

    ngOnDestroy() {
        this.nav.removeLink(this);
    }

    toggle() {
        this.expanded = !this.expanded;
    }
}
