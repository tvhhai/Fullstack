import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataRes } from "@shared/model";
import { ITableSettings } from "@shared/components/common/ag-grid/model/ag-grid.model";
import { HttpService } from "@shared/services/http.service";

@Injectable({
    providedIn: "root",
})
export class AgGridService {
    constructor(private httpService: HttpService) {
    }

    selectedRows: any[] = [];

    private readonly api = "api/table-settings";

    getData(tableId: string): Observable<DataRes<ITableSettings>> {
        return this.httpService.performRequest<DataRes<ITableSettings>>(
            "get", this.api + "/" + tableId
        );
    }

    create(data: any): Observable<DataRes<ITableSettings>> {
        return this.httpService.performRequest<DataRes<ITableSettings>>(
            "post", this.api, data
        );
    }

    update(tableId: string, data: any): Observable<DataRes<ITableSettings>> {
        return this.httpService.performRequest<DataRes<ITableSettings>>(
            "patch", this.api + "/" + tableId, data
        );
    }
}
