import { reactive, ref } from "vue";

const dashboard = {
  id: "dashboard",
  i18nKey: "Dashboard",
  icon: "mdi-home",
  type: 0,
};
const users = {
  type: 2,
  id: "user",
  i18nKey: "User",
  icon: "mdi-account-circle",
  children: [
    {
      id: "admin",
      i18nKey: "Admin",
      children:[
        {
          id: "manager-user",
          i18nKey: "Manager",
          url: "/manager",
        },
        {
          id: "setting",
          i18nKey: "Setting",
          url: "/setting",
        },
      ],
    },
    {
      id: "action",
      i18nKey: "Action",
      children: [
        {
          id: "create",
          i18nKey: "Create",
          url: "/create",
        },
        {
          id: "edit",
          i18nKey: "Edit",
          url: "/edit",
        },
      ],
    },
  ],
};
const product = {
  type: 1,
  id: "product",
  i18nKey: "Product",
  icon: "mdi-account-circle",
  children:[
    {
      id: "Manager",
      i18nKey: "Manager",
      url: "/manager",
    },
    {
      id: "type",
      i18nKey: "Type",
      url: "/type",
    },
  ],
};

export default {
  dashboard: dashboard,
  users: users,
  product: product,
};

// export const sidebar = {
//   dashboard: reactive({
//     id: "dashboard",
//     i18nKey: "Dashboard",
//     icon: "mdi-home",
//     type: 0,
//   }),
//
//   users: reactive({
//     type: 2,
//     id: "user",
//     i18nKey: "User",
//     icon: "mdi-account-circle",
//     children: [
//       {
//         id: "admin",
//         i18nKey: "Admin",
//         children: ref([
//           {
//             id: "manager-user",
//             i18nKey: "Manager",
//             url: "/manager",
//           },
//           {
//             id: "setting",
//             i18nKey: "Setting",
//             url: "/setting",
//           },
//         ]),
//       },
//       {
//         id: "action",
//         i18nKey: "Action",
//         children: [
//           {
//             id: "create",
//             i18nKey: "Create",
//             url: "/create",
//           },
//           {
//             id: "edit",
//             i18nKey: "Edit",
//             url: "/edit",
//           },
//         ],
//       },
//     ],
//   }),
//
//   product: reactive({
//     type: 1,
//     id: "product",
//     i18nKey: "Product",
//     icon: "mdi-account-circle",
//     children: ref([
//       {
//         id: "Manager",
//         i18nKey: "Manager",
//         url: "/manager",
//       },
//       {
//         id: "type",
//         i18nKey: "Type",
//         url: "/type",
//       },
//     ]),
//   }),
// };
