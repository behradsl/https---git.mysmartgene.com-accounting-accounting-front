import { SidebarMenuItemType } from "@/types/global";
import {
  Atom,
  LayoutDashboard,
  Users,
  Receipt,
  CreditCard,
} from "lucide-react";

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
    title: "Laboratories",
    icon: Atom,
    items: [
      {
        title: "Laboratory Profiles",
        href: "/panel/laboratories",
      },
    ],
  },
  {
    title: "Financial",
    href: "/panel/financial",
    icon: Receipt,
    items: [
      {
        title: "Invoices",
        href: "/panel/financial/invoices",
      },
      {
        title: "Payments",
        href: "/panel/financial/payments",
        icon: CreditCard,
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
];
