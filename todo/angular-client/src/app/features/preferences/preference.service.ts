import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataRes } from "@shared/model";
import { Preference } from "./model/preference.model";
import { AppSettings } from "@core/models/app-settings";
import { HttpService } from "@shared/services/http.service";

@Injectable({
    providedIn: "root"
})
export class PreferenceService {

    api: string = "api/preferences";

    constructor(private httpService: HttpService) {
    }

    createDefault(data: Preference[]): Observable<DataRes<AppSettings>> {
        return this.httpService.performRequest<DataRes<AppSettings>>(
            "post", this.api + "/create-default", data
        );
    }

    getData(): Observable<DataRes<AppSettings>> {
        return this.httpService.performRequest<DataRes<AppSettings>>(
            "get", this.api
        );
    }

    update(settingKey: string, data: Preference): Observable<DataRes<Preference[]>> {
        return this.httpService.performRequest<DataRes<Preference[]>>(
            "patch", this.api + "/" + settingKey, data
        );
    }
}