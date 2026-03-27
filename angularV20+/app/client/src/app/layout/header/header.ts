import { Component, DOCUMENT, EventEmitter, Inject, Input, Optional, Output } from "@angular/core";
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatDivider } from "@angular/material/divider";
import { FormControl } from "@angular/forms";

// import { ButtonDirective } from "primeng/button";

@Component({
    selector: "app-header",
    imports: [
        MatIconModule,
        MatToolbar,
        MatIcon,
        MatDivider,
        // ButtonDirective
    ],
    templateUrl: "./header.html",
    styleUrl: "./header.scss"
})
export class Header {
    @Output() clicked = new EventEmitter<number>();
    @Input() opened!: boolean;

    toggleControl = new FormControl(false);

    private htmlElement!: HTMLHtmlElement;

    constructor(@Optional() @Inject(DOCUMENT) private document: Document) {
        this.htmlElement = this.document.querySelector("html")!;
    }

    ngOnInit(): void {
        this.toggleControl.valueChanges.subscribe((darkMode) => {
            if (darkMode) {
                this.htmlElement.classList.add("theme-dark");
            } else {
                this.htmlElement.classList.remove("theme-dark");
            }
        });
    }

    toggle() {
        this.clicked.emit();
    }
}
