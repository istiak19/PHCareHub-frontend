import { getNavItemsByRole } from "@/lib/navItems.config";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { getMeUser } from "@/services/user/getMeUser";
import { getDefaultDashboardRoute } from "@/utility/helper";
import { NavSection } from "@/types/dashboard";
import { UserInfo } from "@/types";

const DashboardSidebar = async () => {
  const userInfo = (await getMeUser()) as UserInfo;

  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;