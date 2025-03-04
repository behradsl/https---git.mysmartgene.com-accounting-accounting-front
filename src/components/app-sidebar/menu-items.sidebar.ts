import { SidebarMenuItemType } from "@/types/global";
import { Atom, LayoutDashboard, Users } from "lucide-react";

// const menuItems = [
//   {
//     title: "Dashboard",
//     icon: Home,
//     href: "/panel",
//     items: [
//       { title: "registries", href: "/panel/registries", icon: Home },
//       { title: "previews", href: "/panel/registries/preview" },
//     ],
//   },
//   {
//     title: "Users",
//     icon: Users,
//     items: [
//       { title: "user management", href: "/panel/users" },
//       { title: "permissions", href: "/panel/users/permissions" },
//     ],
//   },
//   {
//     title: "Laboratories",
//     icon: Atom,
//     items: [{ title: "laboratory management", href: "/panel/laboratories" }],
//   },
// ];
export const menuItems: SidebarMenuItemType[] = [
  {
    title: "Registries",
    icon: LayoutDashboard,
    items: [
      {
        title: "Finalized",
        href: "/panel/registries/overview",
      },
      {
        title: "Staged",
        href: "/panel/registries/staged",
      },
    ],
  },
  {
    title: "Users",
    icon: Users,
    items: [
      {
        title: "User Management",
        href: "/panel/users",
        items: [
          { title: "Users Profiles", href: "/panel/users/profiles" },
          {
            title: "Permissions",
            href: "/panel/users/permissions",
          },
        ],
      },
    ],
  },
  {
    title: "Laboratories",
    icon: Atom,
    items: [
      {
        title: "Laboratory Profiles",
        href: "/panel/laboratories",
      },
    ],
  },
];
