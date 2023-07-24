import {ButtonColor, ButtonTypes} from "@shared/components/common/button/button.enum";

export interface ButtonGroup {
  type: ButtonTypes;
  color: ButtonColor;
  click: () => void;
  disable: () => boolean;
  icon: string;
}
