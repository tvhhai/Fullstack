import {
  ButtonColor,
  ButtonTypes,
} from '@shared/components/common/button/button.enum';

export interface ButtonGroup {
  click: () => void;
  color: ButtonColor;
  disable: () => boolean;
  icon: string;
  type: ButtonTypes;
}
