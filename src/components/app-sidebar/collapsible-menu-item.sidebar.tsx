"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { SidebarMenuItemType } from "@/types/global";
import clsx from "clsx";
import Link from "next/link";

interface CollapsibleMenuItemProps {
  item: SidebarMenuItemType;
  level?: number;
}

export function CollapsibleMenuItem({
  item,
  level = 0,
}: CollapsibleMenuItemProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const Icon = item.icon;

  // Check if current path matches this item or any of its children
  const isActive = React.useMemo(() => {
    const checkPath = (items?: SidebarMenuItemType[]): boolean => {
      if (!items) return false;
      return items.some(
        (subItem) =>
          subItem.href === pathname ||
          pathname.startsWith(subItem.href || "undefined") ||
          checkPath(subItem.items),
      );
    };
    return (
      item.href === pathname ||
      pathname.startsWith(item.href || "undefined") ||
      checkPath(item.items)
    );
  }, [item, pathname]);

  // Auto expand if this item or any of its children are active
  React.useEffect(() => {
    if (isActive) {
      setIsOpen(true);
    }
  }, [isActive]);

  // If the item has no children, render a simple menu button
  if (!item.items?.length) {
    if (level === 0) {
      return (
        <SidebarMenuItem>
          <SidebarMenuButton asChild isActive={isActive}>
            <Link
              href={item.href || "#"}
              className='flex items-center gap-2 cursor-pointer'>
              {Icon && (
                <Icon
                  className={clsx(
                    "h-5 w-5 transition-colors",
                    isOpen ? "text-primary" : "text-sidebar-foreground",
                  )}
                />
              )}
              <span className='overflow-hidden text-ellipsis'>
                {item.title}
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    }

    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild isActive={isActive}>
          <Link href={item.href || "#"} className='cursor-pointer w-full'>
            <span className='overflow-hidden truncate text-ellipsis whitespace-nowrap'>
              {item.title}
            </span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  }

  // For items with children, render a collapsible section
  if (level === 0) {
    return (
      <SidebarMenuItem className='group/collapsible'>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              type='button'
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(!isOpen);
              }}
              className='w-full justify-between cursor-pointer font-semibold'>
              <div className='flex items-center gap-2'>
                {Icon && (
                  <Icon
                    className={clsx(
                      "h-5 w-5 transition-colors",
                      isOpen ? "text-primary" : "text-sidebar-foreground",
                    )}
                  />
                )}
                <span className='overflow-hidden truncate text-ellipsis whitespace-nowrap w-42'>
                  {item.title}
                </span>
              </div>
              <ChevronDown
                className={clsx(
                  "h-4 w-4 shrink-0 transition-transform duration-200",
                  isOpen ? "rotate-180" : null,
                )}
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items.map((subItem, index) => (
                <CollapsibleMenuItem
                  key={index}
                  item={subItem}
                  level={level + 1}
                />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuSubItem className='group/collapsible'>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <SidebarMenuSubButton
            type='button'
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(!isOpen);
            }}
            className='w-full justify-between'>
            <span className='overflow-hidden truncate text-ellipsis whitespace-nowrap w-42'>
              {item.title}
            </span>
            <ChevronDown
              className={clsx(
                "h-4 w-4 shrink-0 transition-transform duration-200",
                isOpen ? "rotate-180" : null,
              )}
            />
          </SidebarMenuSubButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className='ml-2 border-l border-sidebar-border pl-2'>
            <div className='flex flex-col gap-1 py-1'>
              {item.items.map((subItem, index) => (
                <Link
                  key={index}
                  href={subItem.href || "#"}
                  className='flex h-7 items-center rounded-md px-2 text-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground overflow-hidden truncate text-ellipsis whitespace-nowrap w-42'
                  data-active={pathname === subItem.href}>
                  {subItem.title}
                </Link>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuSubItem>
  );
}
