import {ButtonColor} from "@shared/components/common/button/button.enum";

export interface BtnLeftAction {
  id: string;
  i18nKey: string;
  onClick: () => void;
  disable: () => boolean;
  icon: string;
  color: ButtonColor;
}
