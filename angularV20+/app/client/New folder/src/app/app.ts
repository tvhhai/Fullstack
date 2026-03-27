import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { PrimeNG } from "primeng/config";

@Component({
    selector: "app-root",
    imports: [RouterOutlet],
    templateUrl: "./app.html",
    styleUrl: "./app.scss"
})
export class App {
    protected readonly title = signal("client");

    constructor(private primeng: PrimeNG) {
    }

    ngOnInit() {
        this.primeng.ripple.set(true);
    }
}
