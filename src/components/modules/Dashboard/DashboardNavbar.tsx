import { getNavItemsByRole } from "@/lib/navItems.config";
import { getMeUser } from "@/services/user/getMeUser";
import { UserInfo } from "@/types";
import { getDefaultDashboardRoute } from "@/utility/helper";
import DashboardNavbarContent from "./DashboardNavbarContent";

const DashboardNavbar = async () => {
  const userInfo = (await getMeUser()) as UserInfo;
  const navItems = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;