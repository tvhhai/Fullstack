import { IMenuItem } from "@layout/menu/menu.model";

export class MenuConstant {
    public static readonly MENU_ITEMS: {
        [key: string]: IMenuItem;
    } = {
        dashboard: {
            id: "dashboard",
            type: "link",
            name: "common.dashboard",
            route: "/dashboard",
            icon: "fa-light fa-house"
        },
        test: {
            id: "testSection",
            name: "Test111",
            route: "testSection",
            type: "section",
            child: [
                {
                    id: 1,
                    name: "Test",
                    icon: "fa-light fa-users",
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
                            id: 3,
                            name: "Test 2",
                            route: "test2",
                            type: "sub",
                            child: [
                                {
                                    id: 4,
                                    name: "Test 3",
                                    route: "test3",
                                    type: "link"
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 5,
                    name: "Orders",
                    icon: "fa-light fa-users",
                    route: "orders",
                    type: "link"
                }
            ]
        },
        test2: {
            id: "testSection2",
            name: "Test222",
            route: "",
            type: "section",
            child: [
                {
                    id: 11,
                    name: "Test",
                    icon: "fa-light fa-users",
                    route: "test",
                    type: "sub",
                    child: [
                        {
                            id: 21,
                            name: "Test 1",
                            route: "test1",
                            type: "link"
                        },
                        {
                            id: 31,
                            name: "Test 2",
                            route: "test2",
                            type: "sub",
                            child: [
                                {
                                    id: 41,
                                    name: "Test 3",
                                    route: "test3",
                                    type: "link"
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 51,
                    name: "Orders",
                    icon: "fa-light fa-users",
                    route: "orders",
                    type: "link"
                }
            ]
        },
        user: {
            id: "user",
            name: "rbac.user.title",
            route: "rbac",
            type: "section",
            child: [
                {
                    id: 6,
                    name: "rbac.user.title",
                    icon: "fa-light fa-users",
                    route: "user",
                    type: "link",
                    permissions: {
                        only: ["ROLE_ADMIN", "ROLE_MODERATOR"]
                    }
                },
                {
                    id: "role",
                    name: "rbac.role.title",
                    icon: "fa-light fa-user-lock",
                    route: "role",
                    type: "link",
                    permissions: {
                        only: ["ROLE_ADMIN", "ROLE_MODERATOR"]
                    }
                }
            ]
        },
        preferences: {
            id: "preferences",
            name: "preferences.title",
            route: "preferences",
            type: "section",
            child: [
                {
                    id: 7,
                    name: "preferences.userSetting.title",
                    route: "user-setting",
                    type: "link",
                    icon: "fa-light fa-users"
                },
                {
                    id: 8,
                    name: "preferences.systemSetting.title",
                    route: "system-setting",
                    type: "link",
                    icon: "fa-light fa-users"
                }
            ]
        },
        expenses: {
            id: "expenses",
            name: "expenses.titleSidebar",
            route: "expenses",
            type: "section",
            child: [
                {
                    id: "transaction",
                    name: "expenses.transaction.title",
                    icon: "fa-light fa-wallet",
                    route: "transaction",
                    type: "link"
                },
                {
                    id: "category",
                    name: "expenses.category.title",
                    icon: "fa-light fa-grid-2",
                    route: "category",
                    type: "link"
                }
                // {
                //   id: 4,
                //   name: "common.report",
                //   icon: "fa-light fa-chart-simple",
                //   route: "report",
                //   type: "link"
                // }
            ]
        }
    };
}
