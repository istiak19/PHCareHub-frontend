"use client";

import { IconSettings, IconUsers, type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { UseUser } from "@/Providers/UserProvider";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const { user } = UseUser();
  const role = user?.role;
  let menuItems = [...items];

  if (role === "ADMIN") {
    menuItems = [
      ...menuItems,
      {
        title: "Manage Doctors",
        url: "/admin/dashboard/manage-doctors",
        icon: IconSettings,
      },
      {
        title: "Manage Patients",
        url: "/admin/dashboard/manage-patients",
        icon: IconUsers,
      },
    ];
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {menuItems.map((item, index) => (
            <SidebarMenuItem key={`${item.title}-${index}`}>
              <Link href={item.url}>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};