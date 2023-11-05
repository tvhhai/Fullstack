import { ButtonColor } from "@shared/components/common/button/button.enum";

export interface BtnLeftAction {
    id: string;
    color: ButtonColor;
    disable: () => boolean;
    i18nKey: string;
    icon: string;
    onClick: () => void;
}

export interface ITableSettings {
    tableConfig: [];
    tableId: string;
}
