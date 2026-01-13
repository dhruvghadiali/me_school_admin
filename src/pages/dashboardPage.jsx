import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDashboardSummary } from "@MERedux/dashboard/dashboardAction";

import DashboardScreenHeader from "@MEScreenComponents/dashboard/header";
import DashboardScreenStatsData from "@MEScreenComponents/dashboard/statsData";
import DashboardScreenAdmissionSummaryByMonth from "@MEScreenComponents/dashboard/admissionSummaryByMonth";
import DashboardScreenAdmissionSummaryByAcademicYear from "@MEScreenComponents/dashboard/admissionSummaryByAcademicYear";
import DashboardScreenAdmissionSummaryByAcademicClass from "@MEScreenComponents/dashboard/admissionSummaryByAcademicClass";

import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const { dashboardSummaryLoader } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardSummary());
  }, [dispatch]);

  return dashboardSummaryLoader ? (
    <div className="w-full h-screen flex items-center justify-center">
      <MELoaderIcon />
    </div>
  ) : (
    <>
      <DashboardScreenHeader />
      <DashboardScreenStatsData />

      {/* Charts Grid */}
      <div className="mt-8 mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        <DashboardScreenAdmissionSummaryByAcademicClass />
        <DashboardScreenAdmissionSummaryByMonth />
      </div>

      {/* Academic Year Summary */}
      <DashboardScreenAdmissionSummaryByAcademicYear />
    </>
  );
};

export default DashboardPage;
