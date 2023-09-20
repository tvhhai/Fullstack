import { IMenuItem } from "./menu.model";

export class MenuConstant {
    public static readonly MENU_ITEMS: IMenuItem[] = [
        {
            id: "today",
            name: "todo.today.title",
            route: "today",
            type: "link",
            icon: "fa-light fa-calendar-day fa-xl",
            color: "#7ECC49"
        }, {
            id: "important",
            name: "todo.important.title",
            route: "important",
            type: "link",
            icon: "fa-light fa-star fa-xl",
            color: "red"
        }, {
            id: "planed",
            name: "todo.planed.title",
            route: "planed",
            type: "link",
            icon: "fa-light fa-square-poll-horizontal fa-xl",
            color: "#158fAD"
        }, {
            id: "project",
            name: "todo.project.title",
            route: "project",
            type: "sub",
            icon: "",
            color: "#7ECC49",
            child: []
        },
    ];
}
