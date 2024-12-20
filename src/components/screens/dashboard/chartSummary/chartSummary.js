import { useDispatch, useSelector } from "react-redux";
import {
  setApplicationFormSummaryActiveMenu,
  setApplicationFormSummaryBarChartColor,
  setClassLevelSummaryActiveMenu,
} from "@MERedux/dashboard/dashboardSlice";

import _ from "lodash";
import MEBarChart from "@MECommonComponents/chart/barChart";
import MELineChart from "@MECommonComponents/chart/lineChart";
import DashboardScreenChartSummaryCard from "@MEScreenComponents/dashboard/chartSummary/chartSummaryCard";

const DashboardScreenChartSummary = () => {
  const {
    applicationFormSummaryDropdownList,
    applicationFormSummaryChartData,
    applicationFormSummaryChartConfig,
    applicationFormSummaryActiveMenu,
    applicationFormSummaryBarChartColor,
    classLevelSummaryDropdownList,
    classLevelSummaryChartData,
    classLevelSummaryActiveMenu,
    classLevelSummaryChartConfig,
    classLevelSummaryLineChartConfig,
  } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  const applicationFormSummaryActiveMenuAction = (selectedOption) =>
    dispatch(setApplicationFormSummaryActiveMenu(selectedOption));

  const applicationFormSummaryBarChartColorAction = (index) =>
    dispatch(setApplicationFormSummaryBarChartColor(index));

  const classLevelSummaryActiveMenuAction = (selectedOption) =>
    dispatch(setClassLevelSummaryActiveMenu(selectedOption));

  return (
    <div className="grid grid-flow-row grid-cols-2 gap-4 mr-5">
      <DashboardScreenChartSummaryCard
        onDropdownSelection={(selectedOption, index) => {
          applicationFormSummaryActiveMenuAction(selectedOption);
          applicationFormSummaryBarChartColorAction(index);
        }}
        dropdownList={applicationFormSummaryDropdownList}
        activeDropdown={applicationFormSummaryActiveMenu}
        dropdownTitle="from status"
        summaryHeader={`Summary by Year (${_.upperCase(
          applicationFormSummaryActiveMenu
        )})`}
        summarySubtitle="Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click."
        summaryNotes="Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click."
      >
        <MEBarChart
          chartData={applicationFormSummaryChartData}
          chartConfig={applicationFormSummaryChartConfig}
          barColor={applicationFormSummaryBarChartColor}
          xAxisDataKey="year"
          YAxisDataKey="form"
        />
      </DashboardScreenChartSummaryCard>
      <DashboardScreenChartSummaryCard
        onDropdownSelection={(selectedOption) =>
          classLevelSummaryActiveMenuAction(selectedOption)
        }
        dropdownList={classLevelSummaryDropdownList}
        activeDropdown={classLevelSummaryActiveMenu}
        dropdownTitle="year"
        summaryHeader={`Summary by Class Level (${_.upperCase(
          classLevelSummaryActiveMenu
        )})`}
        summarySubtitle="Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click."
        summaryNotes="Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click."
      >
        <MELineChart
          chartData={classLevelSummaryChartData}
          chartConfig={classLevelSummaryChartConfig}
          lineConfig={classLevelSummaryLineChartConfig}
          xAxisDataKey="classLevel"
          YAxisDataKey="admissionForm"
        />
      </DashboardScreenChartSummaryCard>
    </div>
  );
};

DashboardScreenChartSummary.propTypes = {};

export default DashboardScreenChartSummary;
