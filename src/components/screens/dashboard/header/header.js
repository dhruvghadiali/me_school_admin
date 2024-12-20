import { useTranslation } from "react-i18next";
import { dashboardSummary } from "@MELocalizationEn/dashboard/dashboardTranslationEn";

import _ from "lodash";

const DashboardScreenHeader = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <p className="text-3xl font-semibold">
        {i18n.exists("header")
          ? _.startCase(t("header"))
          : _.startCase(dashboardSummary.header)}
      </p>
      <p className="text-sm mt-1">
        {i18n.exists("subtitle")
          ? _.upperFirst(t("subtitle"))
          : _.upperFirst(dashboardSummary.subtitle)}
      </p>
    </div>
  );
};

DashboardScreenHeader.propTypes = {};

export default DashboardScreenHeader;
