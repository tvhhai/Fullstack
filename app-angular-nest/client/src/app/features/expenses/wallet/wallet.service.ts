import { Injectable } from "@angular/core";
import { BehaviorSubject, finalize, Observable, tap } from "rxjs";
import { DataRes } from "@shared/model";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "@shared/services/loader.service";
import { IWallet } from "./model/waller.model";

@Injectable({
    providedIn: "root"
})
export class WalletService {
    constructor(private http: HttpClient, private loaderService: LoaderService) {
        this.fetchExpenses();
    }

    private walletSubject: BehaviorSubject<IWallet[]> = new BehaviorSubject<IWallet[]>([]);

    public wallet$: Observable<IWallet[]> = this.walletSubject.asObservable();

    getDataWallet(): Observable<IWallet[]> {
        return this.wallet$;
    }

    setDataWallet(data: IWallet[]) {
        this.walletSubject.next(data);
    }

    fetchExpenses() {
        this.loaderService.isLoading.next(true);

        this.http.get<DataRes<IWallet[]>>("api/wallet")
            .subscribe((res) => {
                this.setDataWallet(res.data);
                this.loaderService.isLoading.next(false);

            });
    }

    create(data: IWallet): Observable<DataRes<IWallet[]>> {
        this.loaderService.isLoading.next(true);

        return this.http.post<DataRes<IWallet[]>>("api/wallet", data).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }
}
