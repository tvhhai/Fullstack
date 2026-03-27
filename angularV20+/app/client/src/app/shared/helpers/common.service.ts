import { Injectable } from "@angular/core";


@Injectable({
    providedIn: "root"
})
export class CommonService {
    isArrayEmpty<T>(arr: T[] | null | undefined): boolean {
        return !arr || arr.length === 0;
    }
}