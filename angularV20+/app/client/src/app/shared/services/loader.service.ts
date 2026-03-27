import { Injectable, signal } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class LoaderService {
    isLoading = new Subject<boolean>();

    // isLoading = signal(true);

    constructor() {
    }
}
