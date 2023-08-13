import { EDateFormat, ETimeFormat } from "@shared/enum/dayjs-format";
import { AppSettings, Currency } from "@core/models/app-settings";
import { ObjSelection } from "@shared/model";

export class SettingConstant {
    public static readonly CURRENCY_DATA: Record<string, Currency> = {
        USD: { locale: "en-US", currencyCode: "USD" },
        VND: { locale: "vi-VN", currencyCode: "VND" },
    };

    public static readonly DEFAULT_SETTINGS: AppSettings = {
        language: "en",
        currency: JSON.stringify(this.CURRENCY_DATA["USD"]),
        dateFormat: EDateFormat.DEFAULT,
        timeFormat: ETimeFormat.DEFAULT,
        themeOptions: "light",
        themeColor: "a"
    };

    public static readonly THEME_OPTIONS: ObjSelection[] = [
        {
            name: "Light",
            value: "light"
        },
        {
            name: "Dark",
            value: "dark"
        }
    ];

    public static readonly THEME_COLOR: ObjSelection[] = [];

    public static readonly LANGUAGE_SETTINGS: ObjSelection[] = [
        {
            name: "preferences.userSetting.languages.english",
            value: "en"
        },
        {
            name: "preferences.userSetting.languages.vietnamese",
            value: "vn"
        }
    ];

    public static readonly CURRENT_SETTINGS: ObjSelection[] = [
        {
            name: "USD",
            value: JSON.stringify({ locale: "en-US", currencyCode: "USD" })
        },
        {
            name: "VND",
            value: JSON.stringify({ locale: "vi-VN", currencyCode: "VND" })
        }
    ];

    public static readonly DATE_FORMAT_SETTINGS: ObjSelection[] = [
        {
            name: "Medium",
            value: EDateFormat.MEDIUM
        }, {
            name: "Default",
            value: EDateFormat.DEFAULT
        }, {
            name: "Full",
            value: EDateFormat.FULL
        }, {
            name: "Short",
            value: EDateFormat.SHORT
        }, {
            name: "Long",
            value: EDateFormat.LONG
        }
    ];

    public static readonly TIME_FORMAT_SETTINGS: ObjSelection[] = [
        {
            name: "Medium",
            value: ETimeFormat.MEDIUM
        }, {
            name: "Default",
            value: ETimeFormat.DEFAULT
        }, {
            name: "Full",
            value: ETimeFormat.FULL
        }, {
            name: "Short",
            value: ETimeFormat.SHORT
        }, {
            name: "Long",
            value: ETimeFormat.LONG
        }
    ];
}
