import { Component, EventEmitter, Output } from "@angular/core";
import { ButtonDirective } from "primeng/button";

@Component({
    selector: "app-header",
    imports: [
        ButtonDirective
    ],
    templateUrl: "./header.html",
    styleUrl: "./header.scss"
})
export class Header {
    @Output() toggleSidebar = new EventEmitter<void>();

    onToggleClick() {
        this.toggleSidebar.emit();
    }
}
