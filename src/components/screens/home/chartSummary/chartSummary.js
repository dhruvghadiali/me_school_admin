import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

import HomeScreenChartSummaryCard from "./chartSummaryCard";
import MEBarChart from "../../../common/chart/barChart";
import MELineChart from "../../../common/chart/lineChart";
import {
  setApplicationFormSummaryActiveMenu,
  setApplicationFormSummaryBarChartColor,
  setClassLevelSummaryActiveMenu,
} from "../../../../slice/dashboard/dashboardSlice";

const HomeScreenChartSummary = () => {
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
      <HomeScreenChartSummaryCard
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
      </HomeScreenChartSummaryCard>
      <HomeScreenChartSummaryCard
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
      </HomeScreenChartSummaryCard>
    </div>
  );
};

export default HomeScreenChartSummary;
