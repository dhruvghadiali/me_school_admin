import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AuthHoc from "../../components/common/authHoc/authHoc";
import MESidebar from "../../components/common/sidebar/meSidebar";
import HomeScreenHeader from "../../components/screens/home/header/header";
import HomeScreenSummary from "../../components/screens/home/summary/summary";
import HomeScreenChartSummary from "../../components/screens/home/chartSummary/chartSummary";
import { summary } from "../../slice/dashboard/dashboardAction";

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(summary());
  }, []);

  return (
    <>
      <AuthHoc>
        <MESidebar>
          <HomeScreenHeader />
          <HomeScreenSummary />
          <HomeScreenChartSummary />
        </MESidebar>
      </AuthHoc>
    </>
  );
};

export default HomeScreen;
