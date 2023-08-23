import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { DataRes } from "@shared/model";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "@shared/services/loader.service";
import { ITableSettings } from "@shared/components/common/ag-grid/model/ag-grid.model";

@Injectable({
    providedIn: "root",
})
export class AgGridService {
    constructor(private http: HttpClient, private loaderService: LoaderService) {
    }

    selectedRows: any[] = [];

    private readonly api = "api/table-settings";

    getData(tableId: string): Observable<DataRes<ITableSettings>> {
        this.loaderService.isLoading.next(true);

        return this.http.get<DataRes<ITableSettings>>(this.api + "/" + tableId).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }

    create(data: any): Observable<DataRes<ITableSettings>> {
        this.loaderService.isLoading.next(true);

        return this.http.post<DataRes<ITableSettings>>(this.api, data).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }

    update(tableId: string, data: any): Observable<DataRes<ITableSettings>> {
        this.loaderService.isLoading.next(true);

        return this.http.patch<DataRes<ITableSettings>>(this.api + "/" + tableId, data).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }
}
