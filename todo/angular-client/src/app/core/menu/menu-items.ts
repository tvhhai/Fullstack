import { IMenuItem } from "./menu.model";

export class MenuConstant {
    public static readonly MENU_ITEMS: IMenuItem[] = [
        {
            id: 9,
            name: "todo.today.title",
            route: "today",
            type: "link",
            icon: "task"
        }, {
            id: 'project',
            name: "todo.project.title",
            route: "project",
            type: "sub",
            icon: "task",
            child: []
        },
    ];
}
