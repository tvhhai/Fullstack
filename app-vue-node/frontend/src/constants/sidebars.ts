export const sidebars = {
  dashboard: {
    id: "dashboard",
    url: "/dashboard",
    i18nKey: "sidebar.dashboard",
    icon: "mdi-home",
    type: 0,
  },
  phone: {
    id: "phone",
    url: "/phone",
    i18nKey: "sidebar.phone",
    icon: "mdi-home",
    type: 0,
  },
  users: {
    type: 2,
    id: "user",
    i18nKey: "sidebar.user.title",
    icon: "mdi-account-circle",
    children: [
      {
        id: "admin",
        i18nKey: "sidebar.user.admin",
        children: [
          {
            id: "manager-user",
            i18nKey: "sidebar.user.manager",
            url: "/users-manager",
          },
          {
            id: "setting",
            i18nKey: "sidebar.user.setting",
            url: "/users-setting",
          },
        ],
      },
      {
        id: "action",
        i18nKey: "sidebar.user.action",
        children: [
          {
            id: "create",
            i18nKey: "sidebar.user.create",
            url: "/users-create",
          },
          {
            id: "edit",
            i18nKey: "sidebar.user.edit",
            url: "/users-edit",
          },
        ],
      },
    ],
  },
  products: {
    type: 1,
    id: "product",
    i18nKey: "sidebar.product.title",
    icon: "mdi-account-circle",
    children: [
      {
        id: "Manager",
        i18nKey: "sidebar.product.manager",
        url: "product-manager",
      },
      {
        id: "type",
        i18nKey: "sidebar.product.type",
        url: "/product-type",
      },
    ],
  },
};
