"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { navItems, dashboardMap, NavItem } from "./nav-items";
import { NavUser } from "@/components/nav-user";
import { UseUser } from "@/Providers/UserProvider";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { user } = UseUser();
  const role = user?.role;

  // Add dashboard link at top based on role
  const itemsWithDashboard: NavItem[] = role
    ? [
      {
        title: dashboardMap[role].label,
        url: dashboardMap[role].href,
        icon: dashboardMap[role].icon,
        roles: [role],
      },
      ...navItems,
    ]
    : navItems;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" className="flex items-center gap-2">
                <div className="relative w-8 h-8 overflow-hidden">
                  <Image src={logo} alt="Logo" fill />
                </div>
                <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                  PHCareHub
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={itemsWithDashboard} />
      </SidebarContent>

      <SidebarFooter>
        {user && <NavUser user={user} />}
      </SidebarFooter>
    </Sidebar>
  );
}