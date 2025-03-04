"use client";

import { menuItems } from "./menu-items.sidebar";
import { CollapsibleMenuItem } from "./collapsible-menu-item.sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarProvider,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { FC, PropsWithChildren } from "react";
import Image from "next/image";
import MsgLogo from "@/assets/msg-logo.svg";
import clsx from "clsx";

export const AppSidebar: FC<PropsWithChildren> = ({ children }) => {
  const { state } = useSidebar();
  return (
    <SidebarProvider>
      <div className='flex min-h-screen'>
        <Sidebar>
          <SidebarHeader className='flex items-center justify-center py-12'>
            <Image
              {...MsgLogo}
              className={clsx("mx-auto scale-125")}
              alt='msg logo'
            />
          </SidebarHeader>
          <SidebarContent className='px-2'>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <CollapsibleMenuItem key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className='p-4 text-xs text-muted-foreground'>
            <p>© 2025 MySmartGene</p>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <div
          className={clsx(
            "flex-1 p-8 max-sm:w-screen transition-width duration-200", // Add transition for smooth animation
            "w-[calc(100vw--.01rem)] md:w-[calc(100vw-var(--sidebar-main-padding))]", // Apply width based on sidebar state
          )}>
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};
AppSidebar.displayName = "AppSidebar";
export default AppSidebar;
