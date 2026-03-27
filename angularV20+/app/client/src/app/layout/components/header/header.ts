import { Component, DOCUMENT, effect, EventEmitter, Inject, Input, OnInit, Optional, Output } from "@angular/core";
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatDivider } from "@angular/material/divider";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconButton } from "@angular/material/button";
import { MatSlideToggle, MatSlideToggleChange } from "@angular/material/slide-toggle";
import { Settings } from "@bootstrap/settings";
import { LanguageSwitcher } from "@core/components/language-switcher/language-switcher";

@Component({
    selector: "app-header",
    imports: [
        MatIconModule,
        MatToolbar,
        MatIcon,
        MatDivider,
        MatIconButton,
        MatSlideToggle,
        ReactiveFormsModule,
        LanguageSwitcher,
    ],
    templateUrl: "./header.html",
    styleUrl: "./header.scss"
})
export class Header implements OnInit {
    @Output() clicked = new EventEmitter<number>();
    @Input() opened!: boolean;

    private htmlElement!: HTMLHtmlElement;

    constructor(@Optional() @Inject(DOCUMENT) private document: Document, private settings: Settings) {
        this.htmlElement = this.document.querySelector("html")!;
        effect(() => {
            this.opened = this.settings.settings().sidebarOpen;
            this.darkMode ? this.htmlElement.classList.add("theme-dark") : this.htmlElement.classList.remove("theme-dark");
        });
    }

    get darkMode() {
        return this.settings.settings().darkMode;
    }

    ngOnInit(): void {
        // this.toggleControl.valueChanges.subscribe((darkMode) => {
        //     darkMode ? this.htmlElement.classList.add("theme-dark") : this.htmlElement.classList.remove("theme-dark");
        // });
    }

    toggle() {
        this.clicked.emit();
        this.opened = !this.opened;
    }

    onToggleChange(event: MatSlideToggleChange) {
        this.settings.toggleDarkMode(event.checked);
    }


}
