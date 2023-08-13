import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "@shared/services/loader.service";
import { finalize, Observable } from "rxjs";
import { DataRes } from "@shared/model";
import { Preference } from "./model/preference.model";
import { AppSettings } from "@core/models/app-settings";

@Injectable({
    providedIn: "root"
})
export class PreferenceService {
    constructor(private http: HttpClient, private loaderService: LoaderService) {
    }


    createDefault(data: Preference[]): Observable<DataRes<AppSettings>> {
        this.loaderService.isLoading.next(true);

        return this.http.post<DataRes<AppSettings>>("api/preferences/create-default", data).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }

    getData(): Observable<DataRes<AppSettings>> {
        this.loaderService.isLoading.next(true);

        return this.http.get<DataRes<AppSettings>>("api/preferences").pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }

    update(settingKey: string, data: Preference): Observable<DataRes<Preference[]>> {
        this.loaderService.isLoading.next(true);

        return this.http.patch<DataRes<Preference[]>>("api/preferences/" + settingKey, data).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }
}