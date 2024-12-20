import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { variants } from "@MEUtils/enums";
import {
  isUndefinedOrNull,
  indianNumberFormate,
} from "@MEUtils/utilityFunctions";
import { dashboardSummary } from "@MELocalizationEn/dashboard/dashboardTranslationEn";

import _ from "lodash";
import HomeScreenSummaryCard from "@MEScreenComponents/dashboard/summary/summaryCard";

const HomeScreenSummary = () => {
  const { summaryData } = useSelector((state) => state.dashboard);
  const { t, i18n } = useTranslation();
  const summary = summaryData && summaryData.summary ? summaryData.summary : {};

  return (
    <div className="grid grid-flow-row grid-cols-4 mr-5 gap-4 mt-5 mb-5">
      <HomeScreenSummaryCard
        titleVariant={variants.PRIMARY}
        SummaryTitle={
          !isUndefinedOrNull(summary.admissionForm)
            ? _.toString(indianNumberFormate(summary.admissionForm))
            : "-"
        }
        summaryDescription={
          i18n.exists("admissionFormCardLabel")
            ? t("admissionFormCardLabel")
            : dashboardSummary.admissionFormCardLabel
        }
      />
      <HomeScreenSummaryCard
        titleVariant={variants.SUCCESS}
        SummaryTitle={
          !isUndefinedOrNull(summary.approvedForm)
            ? _.toString(indianNumberFormate(summary.approvedForm))
            : "-"
        }
        summaryDescription={
          i18n.exists("approvedFormCardLabel")
            ? t("approvedFormCardLabel")
            : dashboardSummary.approvedFormCardLabel
        }
      />
      <HomeScreenSummaryCard
        titleVariant={variants.DANGER}
        SummaryTitle={
          !isUndefinedOrNull(summary.rejectedForm)
            ? _.toString(indianNumberFormate(summary.rejectedForm))
            : "-"
        }
        summaryDescription={
          i18n.exists("rejectedFormCardLabel")
            ? t("rejectedFormCardLabel")
            : dashboardSummary.rejectedFormCardLabel
        }
      />
      <HomeScreenSummaryCard
        titleVariant={variants.WARNING}
        SummaryTitle={
          !isUndefinedOrNull(summary.canceledForm)
            ? _.toString(indianNumberFormate(summary.canceledForm))
            : "-"
        }
        summaryDescription={
          i18n.exists("canceledFormCardLabel")
            ? t("canceledFormCardLabel")
            : dashboardSummary.canceledFormCardLabel
        }
      />
    </div>
  );
};

HomeScreenSummary.propTypes = {};

export default HomeScreenSummary;
