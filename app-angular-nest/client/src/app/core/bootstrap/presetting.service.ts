import { Injectable } from "@angular/core";
import { LoaderService } from "@shared/services/loader.service";
import { BehaviorSubject, Observable } from "rxjs";
import { PreferenceService } from "../../features/preferences/preference.service";
import { HttpClient } from "@angular/common/http";
import { DataRes } from "@shared/model";
import { AppSettings, LanguageType, ThemeOptions } from "@core/models/app-settings";
import { isEmptyObj } from "@shared/helpers";
import { Preference } from "../../features/preferences/model/preference.model";
import { SettingConstant } from "@core/constants/setting.constant";

@Injectable({
    providedIn: "root"
})
export class PreSettingService {
    constructor(private loaderService: LoaderService,
                private preferenceService: PreferenceService,
                private http: HttpClient) {
    }


    private defaultSettings = SettingConstant.DEFAULT_SETTINGS;

    private preSettingSubject: BehaviorSubject<AppSettings> = new BehaviorSubject<AppSettings>(this.defaultSettings);

    public preSetting$: Observable<AppSettings> = this.preSettingSubject.asObservable();

    private settings: AppSettings = this.defaultSettings;

    load() {
        this.preferenceService.getData().subscribe({
            next: (res) => {
                if (isEmptyObj(res.data)) {
                    let defaultSetting: Preference[] = [];

                    Object.keys(this.defaultSettings).forEach((val) => {
                        defaultSetting.push(
                            {
                                settingKey: val,
                                settingValue: this.defaultSettings[val]
                            }
                        );
                    });

                    this.preferenceService.createDefault(defaultSetting).subscribe({
                        next: (res) => {
                            this.setSettings(res.data);
                            this.setDataPreSetting(res.data);
                        }
                    });
                } else {
                    this.preferenceService.getData().subscribe({
                        next: (res) => {
                            this.setSettings(res.data);
                            this.setDataPreSetting(res.data);
                        }
                    });
                }
            }
        });
    }

    getSettings() {
        return this.settings;
    }

    setSettings(settings: AppSettings) {
        this.settings = settings;
        this.preSettingSubject.next(this.settings);
    }

    updateSetting(settingKey: string, settingValue: string) {
        this.settings[settingKey] = settingValue;
        this.setDataPreSetting(this.settings);
    }

    getDataPreSetting(): Observable<AppSettings> {
        return this.preSetting$;
    }

    setDataPreSetting(data: AppSettings) {
        this.preSettingSubject.next(data);
    }
}