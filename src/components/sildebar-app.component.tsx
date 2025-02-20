"use client";

import * as React from "react";
import { ChevronDown, ChevronRight, Home, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import UserCard from "./user-card.component";

import Link from "next/link";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    items: [
      { title: "registries", href: "/panel/registries" },
      { title: "previewed", href: "" },
    ],
  },
  {
    title: "Users",
    icon: Users,
    items: [
      { title: "user management", href: "" },
      { title: "permissions", href: "" },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-between p-4">
        <h2
          className={cn(
            "text-lg font-semibold",
            state === "collapsed" && "hidden"
          )}
        >
          MENU
        </h2>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-between h-full">
        <div>
          {menuItems.map((item, idx) => (
            <CollapsibleMenuItem
              key={`menuItem-${idx}-${item.title}`}
              item={item}
            />
          ))}
        </div>
        <UserCard />
      </SidebarContent>
    </Sidebar>
  );
}

function CollapsibleMenuItem({ item }: { item: (typeof menuItems)[number] }) {
  const { state } = useSidebar();
  const [isOpen, setIsOpen] = React.useState(false);
  const Icon = item.icon;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-between px-4 py-2",
            state === "collapsed" && "justify-center"
          )}
        >
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            <span className={cn(state === "collapsed" && "hidden")}>
              {item.title}
            </span>
          </div>
          {state !== "collapsed" &&
            (isOpen ? <ChevronDown /> : <ChevronRight />)}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className={cn(state === "collapsed" && "hidden")}>
        <div className="space-y-1 px-8 py-2">
          {item.items.map((subItem, idx) => (
            <Button
              asChild
              key={`subItem-${idx}-${subItem.title}`}
              variant="ghost"
              className="w-full justify-start"
            >
              <Link href={subItem.href}> {subItem.title}</Link>
            </Button>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
