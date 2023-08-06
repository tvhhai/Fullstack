import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "@shared/services/loader.service";
import { finalize, Observable } from "rxjs";
import { DataRes } from "@shared/model/data-response.model";
import { PersonalExpense } from "../model/expense.model";


@Injectable({
    providedIn: "root"
})
export class PersonalExpenseService {
    constructor(private http: HttpClient, private loaderService: LoaderService) {
    }

    getData(): Observable<DataRes<PersonalExpense[]>> {
        this.loaderService.isLoading.next(true);

        return this.http.get<DataRes<PersonalExpense[]>>("api/personal-expenses").pipe(
                finalize(() => {
                    this.loaderService.isLoading.next(false);
                })
        );
    }

    getById(id: number): Observable<DataRes<PersonalExpense>> {
        this.loaderService.isLoading.next(true);

        return this.http.get<DataRes<PersonalExpense>>("api/personal-expenses/" + id).pipe(
                finalize(() => {
                    this.loaderService.isLoading.next(false);
                })
        );
    }

    create(data: PersonalExpense): Observable<DataRes<PersonalExpense[]>> {
        this.loaderService.isLoading.next(true);

        return this.http.post<DataRes<PersonalExpense[]>>("api/personal-expenses", data).pipe(
                finalize(() => {
                    this.loaderService.isLoading.next(false);
                })
        );
    }

    update(id: string | number, data: PersonalExpense): Observable<DataRes<PersonalExpense[]>> {
        this.loaderService.isLoading.next(true);

        return this.http.patch<DataRes<PersonalExpense[]>>("api/personal-expenses/" + id, data).pipe(
                finalize(() => {
                    this.loaderService.isLoading.next(false);
                })
        );
    }

    delete(id: number): Observable<DataRes<PersonalExpense[]>> {
        this.loaderService.isLoading.next(true);

        return this.http.delete<DataRes<PersonalExpense[]>>("api/personal-expenses/" + id).pipe(
                finalize(() => {
                    this.loaderService.isLoading.next(false);
                })
        );
    }

    deleteMulti(ids: string[]): Observable<DataRes<PersonalExpense[]>> {
        this.loaderService.isLoading.next(true);

        return this.http.post<DataRes<PersonalExpense[]>>("api/personal-expenses/delete-multi", ids).pipe(
                finalize(() => {
                    this.loaderService.isLoading.next(false);
                })
        );
    }
}
