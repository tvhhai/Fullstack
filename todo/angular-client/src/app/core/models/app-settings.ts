import { EDateFormat, ETimeFormat } from '@shared/enum/dayjs-format';

export interface AppSettings {
  [key: string]: string | object;
  currency: Currency | string;
  dateFormat: EDateFormat;
  language: LanguageType;
  themeColor: string;
  themeOptions: ThemeOptions;

  timeFormat: ETimeFormat;
}

export interface Currency {
  currencyCode: 'USD' | 'VND';
  locale: 'en-US' | 'vi-VN';
}

export type ThemeOptions = 'light' | 'dark';

export type LanguageType = 'en' | 'vn';
