import { EDateFormat, ETimeFormat } from "@shared/enum/dayjs-format";

export interface AppSettings {
    language: LanguageType;
    currency: string;
    dateFormat: EDateFormat;
    timeFormat: ETimeFormat;
    themeOptions: ThemeOptions;
    themeColor: string;

    [key: string]: string | object;
}

export interface Currency {
    locale: "en-US" | "vi-VN";
    currencyCode: "USD" | "VND";
}

export type ThemeOptions = "light" | "dark";

export type LanguageType = "en" | "vn";




