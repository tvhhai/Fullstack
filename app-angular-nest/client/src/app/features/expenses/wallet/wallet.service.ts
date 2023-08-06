import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { DataRes } from "@shared/model";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "@shared/services/loader.service";
import { IWaller } from "./model/waller.model";

@Injectable({
    providedIn: "root"
})
export class WalletService {
    constructor(private http: HttpClient, private loaderService: LoaderService) {
    }

    getData(): Observable<DataRes<IWaller[]>> {
        this.loaderService.isLoading.next(true);

        return this.http.get<DataRes<IWaller[]>>("api/wallet").pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }
}