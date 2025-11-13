import { useTranslation } from "react-i18next";
import { facilityHeader, facilitySubtitle } from "@MELocalization/en";

import _ from "lodash";

const FacilityScreenHeader = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <p className="text-3xl font-semibold">
        {i18n.exists("facilityHeader")
          ? _.startCase(t("facilityHeader"))
          : _.startCase(facilityHeader)}
      </p>
      <p className="text-sm mt-1">
        {i18n.exists("facilitySubtitle")
          ? _.upperFirst(t("facilitySubtitle"))
          : _.upperFirst(facilitySubtitle)}
      </p>
    </div>
  );
};

FacilityScreenHeader.propTypes = {};

export default FacilityScreenHeader;
