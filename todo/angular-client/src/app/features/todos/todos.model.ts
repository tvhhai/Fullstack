import { ViewState } from "./todos.enum";


export type ViewModeItem = {
    name: string;
    value: ViewState;
};

export type ViewMode = {
    [key in ViewState]: ViewModeItem;
};

export interface IColorPrj {
    name: string,
    value: string;
};