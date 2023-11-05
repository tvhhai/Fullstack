import { HttpService } from '@shared/services/http.service';
import { AppSettings } from '@core/models/app-settings';
import { Injectable } from '@angular/core';
import { DataRes } from '@shared/model';
import { Observable } from 'rxjs';

import { Preference } from './model/preference.model';

@Injectable({
    providedIn: 'root',
})
export class PreferenceService {
    api = 'api/preferences';

    constructor(private httpService: HttpService) {}

    createDefault(data: Preference[]): Observable<DataRes<AppSettings>> {
        return this.httpService.performRequest<DataRes<AppSettings>>(
            'post',
            this.api + '/create-default',
            data
        );
    }

    getData(): Observable<DataRes<AppSettings>> {
        return this.httpService.performRequest<DataRes<AppSettings>>(
            'get',
            this.api
        );
    }

    update(
        settingKey: string,
        data: Preference
    ): Observable<DataRes<Preference[]>> {
        return this.httpService.performRequest<DataRes<Preference[]>>(
            'patch',
            this.api + '/' + settingKey,
            data
        );
    }
}
