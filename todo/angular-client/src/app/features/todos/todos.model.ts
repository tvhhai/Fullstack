import { ViewState } from './todos.enum';

export type ViewModeItem = {
  value: ViewState;
  name: string;
};

export type ViewMode = {
  [key in ViewState]: ViewModeItem;
};

export interface IColorPrj {
  name: string;
  value: string;
}
