import { Component } from "@angular/core";
import { get } from "lodash";
import { PreferenceService } from "../preference.service";
import { PreSettingService } from "@core/bootstrap/presetting.service";
import { TranslateService } from "@ngx-translate/core";
import { MatSelectChange } from "@angular/material/select";
import { AppSettings } from "@core/models/app-settings";
import { SettingConstant } from "@core/constants/setting.constant";

@Component({
    selector: "app-user-setting",
    templateUrl: "./user-setting.component.html",
    styleUrls: ["./user-setting.component.scss"]
})
export class UserSettingComponent {
    constructor(private preferenceService: PreferenceService,
                private preSettingService: PreSettingService,
                private translate: TranslateService,) {
    }

    setting: AppSettings = SettingConstant.DEFAULT_SETTINGS;
    languageSettings = SettingConstant.LANGUAGE_SETTINGS;
    currencySettings = SettingConstant.CURRENT_SETTINGS;
    dateFormatSettings = SettingConstant.DATE_FORMAT_SETTINGS;
    timeFormatSettings = SettingConstant.TIME_FORMAT_SETTINGS;
    themeOptionsSettings = SettingConstant.THEME_OPTIONS;
    themeColorSettings = SettingConstant.THEME_COLOR;

    ngOnInit() {
        this.getPreference();
    }

    getPreference() {
        this.preferenceService.getData().subscribe({
            next: (res) => {
                this.setting.language = get(res, "data.language", "en");
                this.setting.currency = JSON.stringify(get(res, "data.currency"));
                this.setting.dateFormat = get(res, "data.dateFormat");
                this.setting.timeFormat = get(res, "data.timeFormat");
                this.setting.themeOptions = get(res, "data.themeOptions");
                this.setting.themeColor = get(res, "data.themeColor");
            }
        });
    }

    onChangeLanguage(data: MatSelectChange) {
        this.updateSettings("language", data.value);
    }

    onChangeCurrency(data: MatSelectChange) {
        this.updateSettings("currency", JSON.parse(data.value));
    }

    onChangeDateFormat(data: MatSelectChange) {
        this.updateSettings("dateFormat", data.value);
    }

    onChangeTimeFormat(data: MatSelectChange) {
        this.updateSettings("timeFormat", data.value);
    }

    onChangeThemeOptions(data: MatSelectChange) {
        this.updateSettings("themeOptions", data.value);
    }

    onChangeThemeColor(data: MatSelectChange) {
        this.updateSettings("themeColor", data.value);
    }


    updateSettings(settingKey: string, settingValue: string) {
        const dataReq = { settingValue, settingKey };
        this.preferenceService.update(settingKey, dataReq).subscribe(
            {
                next: (res) => {
                    this.preSettingService.updateSetting(settingKey, settingValue);
                }
            }
        );
    }
}
