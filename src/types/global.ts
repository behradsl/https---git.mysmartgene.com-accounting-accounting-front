import type { LucideIcon } from "lucide-react";

export interface SidebarMenuItemType {
  title: string;
  icon?: LucideIcon;
  href?: string;
  items?: SidebarMenuItemType[];
}
