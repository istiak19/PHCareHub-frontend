import { UserInfo, UserRole } from ".";

export interface NavItem {
    title: string;
    href: string;
    icon: string;
    badge?: string | number;
    description?: string;
    roles: UserRole[];
};

export interface NavSection {
    title?: string;
    items: NavItem[];
};

export interface DashboardSidebarContentProps {
    userInfo: UserInfo;
    navItems: NavSection[];
    dashboardHome: string;
};