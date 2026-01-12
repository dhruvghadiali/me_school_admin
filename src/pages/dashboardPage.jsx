import MESidebar from "@MECommonComponents/sidebar/meSidebar";
import DashboardScreenHeader from "@MEScreenComponents/dashboard/header";
import DashboardScreenUpcomingFeatures from "@MEScreenComponents/dashboard/upcomingFeatures";

const DashboardPage = () => {
  return (
    <MESidebar>
      <DashboardScreenHeader />
      <DashboardScreenUpcomingFeatures />
    </MESidebar>
  );
};

export default DashboardPage;
