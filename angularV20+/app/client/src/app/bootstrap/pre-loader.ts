import { DOCUMENT, Inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class PreLoader {
    private selector = "globalLoader";

    constructor(@Inject(DOCUMENT) private document: Document) {
    }

    private getElement() {
        return this.document.getElementById(this.selector);
    }

    hide() {
        const el = this.getElement();
        if (el) {
            el.addEventListener("transitionend", () => {
                el.className = "gl-loader--hidden";
            });

            if (!el.classList.contains("global-loader-hidden")) {
                el.className += " gl-loader--fade-out";
            }
        }
    }
}
