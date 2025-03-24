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
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useUser } from "@/store/user.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/api";

export const AppSidebar: FC<PropsWithChildren> = ({ children }) => {
  const { state } = useSidebar();
  const { logout, data: currentUser } = useAuth();

  return (
    <SidebarProvider>
      <div className='flex min-h-screen'>
        <Sidebar>
          <SidebarHeader className='flex items-center justify-center py-12'>
            <Image
              width={MsgLogo.width}
              height={MsgLogo.height}
              src={MsgLogo.src}
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
            <div className='w-full flex justify-evenly items-center gap-2 rounded-md border-1 border-gray-200 px-1 py-2'>
              <Avatar>
                <AvatarFallback className="bg-primary/10">
                  {currentUser?.data?.name
                    ?.split(" ")
                    .slice(0, 2)
                    .map((name) => name[0].toUpperCase())
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <DropdownMenu modal>
                <DropdownMenuTrigger asChild>
                  <div className='flex flex-col gap-2'>
                    <div className='flex justify-between items-center cursor-pointer'>
                      <span className='text-xs font-bold text-gray-800'>
                        {currentUser?.data?.name}
                      </span>
                      <ChevronDown />
                    </div>
                    <span className='text-xs'>{currentUser?.data?.email}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='right' className='w-56'>
                  <DropdownMenuItem>
                    <Button
                      className='w-full'
                      variant={"destructive"}
                      onClick={logout}>
                      Sign out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className='text-center'>© 2025 MySmartGene</p>
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
