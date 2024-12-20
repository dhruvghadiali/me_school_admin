import { useDispatch, useSelector } from "react-redux";
import {
  setApplicationFormSummaryActiveMenu,
  setApplicationFormSummaryBarChartColor,
  setClassLevelSummaryActiveMenu,
} from "@MERedux/dashboard/dashboardSlice";
import { dashboardSummary } from "@MELocalizationEn/dashboard/dashboardTranslationEn";

import _ from "lodash";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();

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
        dropdownTitle={
          i18n.exists("barChartDropdownTitle")
            ? t("barChartDropdownTitle")
            : dashboardSummary.barChartDropdownTitle
        }
        summaryHeader={
          i18n.exists("barChartHeaderDynamic")
            ? t("barChartHeaderDynamic", {
                selectedFilter: _.upperCase(applicationFormSummaryActiveMenu),
              })
            : dashboardSummary.barChartHeaderStatic
        }
        summarySubtitle={
          i18n.exists("barChartSubtitle")
            ? t("barChartSubtitle")
            : dashboardSummary.barChartSubtitle
        }
        summaryNotes="** Notes **"
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
        dropdownTitle={
          i18n.exists("lineChartDropdownTitle")
            ? t("lineChartDropdownTitle")
            : dashboardSummary.lineChartDropdownTitle
        }
        summaryHeader={
          i18n.exists("lineChartHeaderDynamic")
            ? t("lineChartHeaderDynamic", {
                selectedFilter: _.upperCase(classLevelSummaryActiveMenu),
              })
            : dashboardSummary.lineChartHeaderStatic
        }
        summarySubtitle={
          i18n.exists("lineChartSubtitle")
            ? t("lineChartSubtitle")
            : dashboardSummary.lineChartSubtitle
        }
        summaryNotes="** Notes **"
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
