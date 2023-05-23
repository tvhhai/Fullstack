import {IMenuItem, IMenuSection} from "../models/menu";

export class MenuConstant {
    public static readonly MENU_ITEMS: { [key: string]: IMenuSection | IMenuItem } = {
        dashboard: {
            id: 'dashboard',
            type: 'link',
            name: 'common.dashboard',
            route: '/dashboard',
            icon: 'dashboard',
        },

        test: {
            sectionId: 'test',
            sectionName: 'Test111',
            sectionType: true,
            apps: [
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

                        },
                        {
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
                    route: 'orders',
                    type: 'link',
                },
            ],
        },

        user: {
            sectionId: 'user',
            sectionName: 'user-manager.title',
            sectionType: true,
            apps: [
                {
                    id: 4,
                    name: 'user-manager.title',
                    icon: 'manage_accounts',
                    route: 'user',
                    type: 'link',
                    permissions: {
                        "only": [
                            "ROLE_ADMIN", "ROLE_MODERATOR"
                        ]
                    },
                }
            ]
        },

        setting: {
            sectionId: 'setting',
            sectionName: 'setting.title',
            sectionType: true,
            apps: [
                {
                    id: 4,
                    name: 'setting.title',
                    icon: 'settings',
                    route: 'setting',
                    type: 'sub',
                    permissions: {
                        "only": [
                            "ROLE_ADMIN", "ROLE_MODERATOR"
                        ]
                    },
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
        }
    }
}
