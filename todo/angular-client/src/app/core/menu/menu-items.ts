import { IMenuItem } from './menu.model';

export class MenuConstant {
    public static readonly MENU_ITEMS: IMenuItem[] = [
        {
            id: 'today',
            color: '#7ECC49',
            countTask: 0,
            icon: 'fa-light fa-calendar-day fa-xl',
            name: 'todo.today.title',
            route: 'today',
            type: 'link',
        },
        {
            id: 'important',
            color: 'red',
            countTask: 0,
            icon: 'fa-light fa-star fa-xl',
            name: 'todo.important.title',
            route: 'important',
            type: 'link',
        },
        {
            id: 'planed',
            color: '#158fAD',
            countTask: 0,
            icon: 'fa-light fa-square-poll-horizontal fa-xl',
            name: 'todo.planed.title',
            route: 'planed',
            type: 'link',
        },
        {
            id: 'project',
            child: [],
            color: '#7ECC49',
            countTask: 0,
            icon: '',
            name: 'todo.project.title',
            route: 'project',
            type: 'sub',
        },
    ];
}
