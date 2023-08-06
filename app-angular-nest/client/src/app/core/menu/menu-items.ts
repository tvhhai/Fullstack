import { IMenuItem } from "./menu.model";

export class MenuConstant {
    public static readonly MENU_ITEMS: {
        [key: string]: IMenuItem;
    } = {
        dashboard: {
            id: "dashboard",
            type: "link",
            name: "common.dashboard",
            route: "/dashboard",
            icon: "dashboard"
        },

        test: {
            id: "testSection",
            name: "Test111",
            route: "testSection",
            type: "section",
            child: [
                {
                    id: 2,
                    name: "Test",
                    icon: "people",
                    route: "test",
                    type: "sub",
                    child: [
                        {
                            id: 2,
                            name: "Test 1",
                            route: "test1",
                            type: "link"
                        },
                        {
                            id: 2,
                            name: "Test 2",
                            route: "test2",
                            type: "sub",
                            child: [
                                {
                                    id: 2,
                                    name: "Test 3",
                                    route: "test3",
                                    type: "link"
                                }
                            ]
                        }

                    ]
                },
                {
                    id: 3,
                    name: "Orders",
                    icon: "shopping_cart",
                    route: "orders",
                    type: "link"
                }
            ]
        },

        user: {
            id: "user",
            name: "user.title",
            // sectionType: true,
            route: "rbac",
            type: "section",
            child: [
                {
                    id: 4,
                    name: "user.title",
                    icon: "manage_accounts",
                    route: "user",
                    type: "link",
                    permissions: {
                        only: ["ROLE_ADMIN", "ROLE_MODERATOR"]
                    }
                },
                {
                    id: "role",
                    name: "role.title",
                    icon: "perm_identity",
                    route: "role",
                    type: "link",
                    permissions: {
                        only: ["ROLE_ADMIN", "ROLE_MODERATOR"]
                    }
                }
            ]
        },

        setting: {
            id: "setting",
            name: "setting.title",
            // sectionType: true,
            route: "setting",
            type: "section",
            child: [
                {
                    id: 4,
                    name: "setting.title",
                    icon: "settings",
                    route: "setting",
                    type: "sub",
                    permissions: {
                        only: ["ROLE_ADMIN", "ROLE_MODERATOR"]
                    },
                    child: [
                        {
                            id: 9,
                            name: "setting.userSetting.title",
                            route: "userSetting",
                            type: "link"
                        },
                        {
                            id: 10,
                            name: "setting.systemSetting.title",
                            route: "systemSetting",
                            type: "link"
                        }
                    ]
                }
            ]
        },

        expenses: {
            id: "expenses",
            name: "expenses.titleSidebar",
            route: "expenses",
            // sectionType: true,
            type: "section",
            child: [
                {
                    id: 4,
                    name: "expenses.personal.title",
                    icon: "account_balance_wallet",
                    route: "personal",
                    type: "link"
                },
                {
                    id: 4,
                    name: "expenses.category",
                    icon: "grid_view",
                    route: "category",
                    type: "link"
                },
                {
                    id: 4,
                    name: "common.report",
                    icon: "insert_chart_outlined",
                    route: "report",
                    type: "link"
                }
            ]
        }
    };
}
