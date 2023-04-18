import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input, Optional,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { FormControl } from "@angular/forms";
import { DOCUMENT } from '@angular/common';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    @Output() clicked = new EventEmitter<number>();
    @Input() opened!: boolean;

    toggleControl = new FormControl(false);

    private htmlElement!: HTMLHtmlElement;


    constructor(
        @Optional() @Inject(DOCUMENT) private document: Document,
    ) {
        this.htmlElement = this.document.querySelector('html')!;
    }

    ngOnInit(): void {
        this.toggleControl.valueChanges.subscribe((darkMode) => {
            if (darkMode) {
                this.htmlElement.classList.add('theme-dark');
            } else {
                this.htmlElement.classList.remove('theme-dark');

            }
        });
    }


    toggle() {
        this.clicked.emit();
    }
}
