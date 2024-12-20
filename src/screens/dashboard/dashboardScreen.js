import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { summary } from "@MERedux/dashboard/dashboardAction";
import { resetState } from "@MERedux/dashboard/dashboardSlice";

import AuthHoc from "@MECommonComponents/authHoc/authHoc";
import MESidebar from "@MECommonComponents/sidebar/meSidebar";
import DashboardScreenHeader from "@MEScreenComponents/dashboard/header/header";
import DashboardScreenSummary from "@MEScreenComponents/dashboard/summary/summary";
import DashboardScreenChartSummary from "@MEScreenComponents/dashboard/chartSummary/chartSummary";
import DashboardScreenChartSummaryLoader from "@MEScreenComponents/dashboard/chartSummary/chartSummaryLoader";
import DashboardScreenSummaryLoader from "@MEScreenComponents/dashboard/summary/summaryLoader";

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
