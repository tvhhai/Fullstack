import { Injectable, signal } from "@angular/core";
import { AppSettings, LanguageType } from "@core/models/app-settings";
import { SettingConstant } from "./constants/setting.constant";

const STORAGE_KEY = "appSettings";

@Injectable({ providedIn: "root" })
export class Settings {
    private readonly settingsSignal = signal<AppSettings>(SettingConstant.DEFAULT_SETTINGS);

    constructor() {
    }

    async load(): Promise<void> {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                this.settingsSignal.set({ ...SettingConstant.DEFAULT_SETTINGS, ...parsed });
            } else {
                this.saveSettings(SettingConstant.DEFAULT_SETTINGS);
                this.settingsSignal.set(SettingConstant.DEFAULT_SETTINGS);
            }
        } catch (err) {
            console.warn("Failed to parse settings from localStorage", err);
            this.settingsSignal.set(SettingConstant.DEFAULT_SETTINGS);
        }
    }

    /** Getter readonly cho UI */
    get settings() {
        return this.settingsSignal.asReadonly();
    }

    /** Update state + lưu vào localStorage */
    update(partial: Partial<AppSettings>) {
        const updated = { ...this.settingsSignal(), ...partial };
        this.settingsSignal.set(updated);
        this.saveSettings(updated);
    }

    updateSettings(settings: AppSettings) {

    }

    toggleDarkMode(value: boolean) {
        this.update({ darkMode: value });
    }

    toggleSidebar(sate: boolean | undefined) {
        if (typeof sate === "undefined") {
            this.update({ sidebarOpen: !this.settingsSignal().sidebarOpen });
        } else {
            this.update({ sidebarOpen: sate });
        }
    }

    setLanguage(lang: LanguageType) {
        this.update({ language: lang });
    }

    /** Helper private */
    private saveSettings(settings: AppSettings) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
}
