import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "@shared/services/loader.service";
import { finalize, Observable } from "rxjs";
import { DataRes } from "@shared/model/data-response.model";
import { ExpenseCategory } from "../model/expense.model";

@Injectable({
    providedIn: "root"
})
export class ExpenseCategoryService {
    constructor(private http: HttpClient, private loaderService: LoaderService) {
    }

    getData(): Observable<DataRes<ExpenseCategory[]>> {
        this.loaderService.isLoading.next(true);

        return this.http.get<DataRes<ExpenseCategory[]>>("api/expense-category").pipe(
                finalize(() => {
                    this.loaderService.isLoading.next(false);
                })
        );
    }
}