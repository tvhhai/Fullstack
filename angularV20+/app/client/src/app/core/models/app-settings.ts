import { EDateFormat, ETimeFormat } from "@shared/enum/dayjs-format";

export interface AppSettings {
    language: LanguageType;
    currency: Currency | string;
    dateFormat: EDateFormat;
    timeFormat: ETimeFormat;
    themeOptions: ThemeOptions;
    themeColor: string;
    sidebarOpen: boolean;
    darkMode: boolean;

    // [key: string]: string | object | boolean;
}

export interface Currency {
    locale: "en-US" | "vi-VN";
    currencyCode: "USD" | "VND";
}

export type ThemeOptions = "light" | "dark";

export type LanguageType = "en" | "vn";




