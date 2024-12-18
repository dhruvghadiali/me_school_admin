import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import HomeScreenChartSummaryCard from "./chartSummaryCard";
import MEBarChart from "../../../common/chart/barChart";
import MELineChart from "../../../common/chart/lineChart";
import {
  resetState,
  setApplicationFormSummaryActiveMenu,
  setApplicationFormSummaryBarChartColor,
  setClassLevelSummaryActiveMenu,
} from "../../../../slice/dashboard/dashboardSlice";

const HomeScreenChartSummary = () => {
  const {
    summaryData,
    applicationFormSummaryActiveMenu,
    applicationFormSummaryBarChartColor,
    classLevelSummaryActiveMenu,
  } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  const applicationFormSummary =
    summaryData &&
    summaryData.applicationFormSummary &&
    summaryData.applicationFormSummary.length > 0
      ? summaryData.applicationFormSummary
      : [];

  const applicationFormSummaryDropdownList = _.map(
    applicationFormSummary,
    "label"
  );

  const applicationFormSummaryChartData = _.find(
    applicationFormSummary,
    (summary) => summary.label === applicationFormSummaryActiveMenu
  );

  const classLevelSummary =
    summaryData &&
    summaryData.classLevelSummary &&
    summaryData.classLevelSummary.length > 0
      ? summaryData.classLevelSummary
      : [];

  const classLevelSummaryDropdownList = _.map(classLevelSummary, "label");

  useEffect(() => {
    dispatch(resetState());

    if (applicationFormSummaryDropdownList.length > 0) {
      applicationFormSummaryActiveMenuAction(
        applicationFormSummaryDropdownList[0]
      );
      applicationFormSummaryBarChartColorAction(0);
    }

    classLevelSummaryDropdownList.length > 0 &&
      classLevelSummaryActiveMenuAction(classLevelSummaryDropdownList[0]);
  }, []);

  const applicationFormSummaryActiveMenuAction = (selectedOption) =>
    dispatch(setApplicationFormSummaryActiveMenu(selectedOption));

  const applicationFormSummaryBarChartColorAction = (index) =>
    dispatch(setApplicationFormSummaryBarChartColor(index));

  const classLevelSummaryActiveMenuAction = (selectedOption) =>
    dispatch(setClassLevelSummaryActiveMenu(selectedOption));

  return (
    <div className="grid grid-flow-row grid-cols-2 gap-4 mr-5">
      <HomeScreenChartSummaryCard
        onDropdownSelection={(selectedOption, index) => {
          applicationFormSummaryActiveMenuAction(selectedOption);
          applicationFormSummaryBarChartColorAction(index);
        }}
        dropdownList={applicationFormSummaryDropdownList}
        activeDropdown={applicationFormSummaryActiveMenu}
        dropdownTitle="from status"
        summaryHeader={`Summary by Year (${_.upperCase(applicationFormSummaryActiveMenu)})`}
        summarySubtitle="Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click."
        summaryNotes="Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click."
      >
        <MEBarChart
          chartData={
            applicationFormSummaryChartData &&
            applicationFormSummaryChartData.data
              ? applicationFormSummaryChartData.data
              : []
          }
          chartConfig={{}}
          xAxisDataKey="year"
          YAxisDataKey="form"
          barColor={applicationFormSummaryBarChartColor}
        />
      </HomeScreenChartSummaryCard>
      <HomeScreenChartSummaryCard
        onDropdownSelection={(selectedOption) =>
          classLevelSummaryActiveMenuAction(selectedOption)
        }
        dropdownList={classLevelSummaryDropdownList}
        activeDropdown={classLevelSummaryActiveMenu}
        dropdownTitle="year"
        summaryHeader="Summary by Class Level"
        summarySubtitle="Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click."
        summaryNotes="Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click."
      >
        <MELineChart />
      </HomeScreenChartSummaryCard>
    </div>
  );
};

export default HomeScreenChartSummary;
