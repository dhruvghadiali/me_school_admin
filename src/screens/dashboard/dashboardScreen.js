import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { summary } from "../../slice/dashboard/dashboardAction";
import { resetState } from "../../slice/dashboard/dashboardSlice";
import AuthHoc from "../../components/common/authHoc/authHoc";
import MESidebar from "@/src/components/screens/dashboard/header/header";
// import DashboardScreenHeader from "../../components/screens/dashboard/header/header";
import DashboardScreenHeader from "../../components/screens/dashboard/header/header";
import DashboardScreenSummary from "../../components/screens/dashboard/summary/summary";
import DashboardScreenChartSummary from "../../components/screens/dashboard/chartSummary/chartSummary";
import DashboardScreenChartSummaryLoader from "../../components/screens/dashboard/chartSummary/chartSummaryLoader";
import DashboardScreenSummaryLoader from "../../components/screens/dashboard/summary/summaryLoader";

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(resetState());
    dispatch(summary());
  }, []);

  return (
    <>
      <AuthHoc>
        <MESidebar>
          <DashboardScreenHeader />
          {loader ? <DashboardScreenSummaryLoader /> : <DashboardScreenSummary />}
          {loader ? <DashboardScreenChartSummaryLoader/> : <DashboardScreenChartSummary /> }
        </MESidebar>
      </AuthHoc>
    </>
  );
};

export default DashboardScreen;
