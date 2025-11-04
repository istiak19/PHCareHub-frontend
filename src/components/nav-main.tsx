"use client";

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
// import { Button } from "@/components/ui/button";
// import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react";
import { UseUser } from "@/Providers/UserProvider";
import { NavItem } from "./nav-items";
import Link from "next/link";

interface NavMainProps {
  items: NavItem[];
}

export function NavMain({ items }: NavMainProps) {
  const { user } = UseUser();
  const role = user?.role;

  // Filter items by role
  const filteredItems = items.filter(item => !item.roles || (role ? item.roles.includes(role) : false));

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {/* Quick Create + Inbox */}
        {/* <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton tooltip="Quick Create" className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-8">
              <IconCirclePlusFilled />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <Button size="icon" variant="outline">
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu> */}

        {/* Role-based links */}
        <SidebarMenu>
          {filteredItems.map(item => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link href={item.url} className="flex items-center gap-2">
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}