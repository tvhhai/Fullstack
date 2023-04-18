import {Menu} from "../models/menu";

export const MENU_ITEMS:Menu[] = [
    {
        id: 1,
        name: 'Dashboard',
        icon: 'dashboard',
        route: 'dashboard',
        type: 'link',
    },
    {
        id: 2,
        name: 'Test',
        icon: 'people',
        route: 'test',
        type: 'sub',
        child: [
            {
                id: 2,
                name: 'Test 1',
                route: 'test1',
                type: 'link',
            },
            {
                id: 2,
                name: 'Test 2',
                route: 'test2',
                type: 'link',
            },{
                id: 2,
                name: 'Test 3',
                route: 'test3',
                type: 'link',
            },
        ],
    },
    {
        id: 3,
        name: 'Orders',
        icon: 'shopping_cart',
        route: '',
        type: 'sub',
        child: [
            {
                id: 5,
                name: 'level 2',
                route: 'test31',
                type: 'link',
            },
            {
                id: 6,
                name: 'level 2',
                route: '',
                type: 'sub',
                child: [
                    {
                        id: 7,
                        name: 'level 3',
                        route: 'test4',
                        type: 'link',
                    },
                    {
                        id: 8,
                        name: 'level 3',
                        route: '',
                        type: 'sub',
                        child: [
                            {
                                id: 9,
                                name: 'level 4',
                                route: 'test5',
                                type: 'link',
                            },
                            {
                                id: 10,
                                name: 'level 4',
                                route: 'test7',
                                type: 'link',
                            },
                        ],
                    },
                ],
            },
            {
                id: 6,
                name: 'level 2',
                route: '',
                type: 'sub',
                child: [
                    {
                        id: 7,
                        name: 'level 3',
                        route: 'test7',
                        type: 'link',
                    },
                    {
                        id: 8,
                        name: 'level 3',
                        route: '',
                        type: 'sub',
                        child: [
                            {
                                id: 9,
                                name: 'level 4',
                                route: 'test8',
                                type: 'link',
                            },
                            {
                                id: 10,
                                name: 'level 4',
                                route: 'test9',
                                type: 'link',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 4,
        name: 'setting.title',
        icon: 'settings',
        route: 'setting',
        type: 'sub',
        child: [
            {
                id: 9,
                name: 'setting.userSetting.title',
                route: 'userSetting',
                type: 'link',
            },
            {
                id: 10,
                name: 'setting.systemSetting.title',
                route: 'systemSetting',
                type: 'link',
            },
        ],
    },
]