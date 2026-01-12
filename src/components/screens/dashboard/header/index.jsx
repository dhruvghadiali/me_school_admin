import { useTranslation } from "react-i18next";
import { dashboardHeader, dashboardSubtitle } from "@MELocalization/en";

import _ from "lodash";

const DashboardScreenHeader = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p className="text-3xl font-semibold">
        {_.startCase(t("dashboardHeader", { defaultValue: dashboardHeader }))}
      </p>
      <p className="text-sm mt-1">
        {_.upperFirst(t("dashboardSubtitle", { defaultValue: dashboardSubtitle }))}
      </p>
    </div>
  );
};

DashboardScreenHeader.propTypes = {};

export default DashboardScreenHeader;
