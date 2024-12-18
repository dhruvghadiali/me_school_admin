import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { summary } from "../../slice/dashboard/dashboardAction";
import AuthHoc from "../../components/common/authHoc/authHoc";
import MESidebar from "../../components/common/sidebar/meSidebar";
import HomeScreenHeader from "../../components/screens/home/header/header";
import HomeScreenSummary from "../../components/screens/home/summary/summary";
import HomeScreenChartSummary from "../../components/screens/home/chartSummary/chartSummary";
import HomeScreenChartSummaryLoader from "../../components/screens/home/chartSummary/chartSummaryLoader";
import HomeScreenSummaryLoader from "../../components/screens/home/summary/summaryLoader";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(summary());
  }, []);

  return (
    <>
      <AuthHoc>
        <MESidebar>
          <HomeScreenHeader />
          {loader ? <HomeScreenSummaryLoader /> : <HomeScreenSummary />}
          {loader ? <HomeScreenChartSummaryLoader/> : <HomeScreenChartSummary /> }
        </MESidebar>
      </AuthHoc>
    </>
  );
};

export default HomeScreen;
