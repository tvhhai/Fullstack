import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "@shared/services/loader.service";
import { finalize, Observable } from "rxjs";
import { DataRes } from "@shared/model/data-response.model";
import { PersonalExpense } from "../model/expense.model";

@Injectable({
    providedIn: "root"
})
export class ReportExpenseService {
    constructor(private http: HttpClient, private loaderService: LoaderService) {
    }

    getData(data: any): Observable<DataRes<PersonalExpense[]>> {
        this.loaderService.isLoading.next(true);

        return this.http.post<DataRes<PersonalExpense[]>>("api/personal-expenses/report", data).pipe(
                finalize(() => {
                    this.loaderService.isLoading.next(false);
                })
        );
    }

}
