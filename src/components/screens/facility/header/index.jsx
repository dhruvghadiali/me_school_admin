import { useTranslation } from "react-i18next";
import { facilityHeader, facilitySubtitle } from "@MELocalization/en";

import _ from "lodash";

const FacilityScreenHeader = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p className="text-3xl font-semibold">
        {_.startCase(t("facilityHeader", { defaultValue: facilityHeader }))}
      </p>
      <p className="text-sm mt-1">
        {_.upperFirst(
          t("facilitySubtitle", { defaultValue: facilitySubtitle })
        )}
      </p>
    </div>
  );
};

FacilityScreenHeader.propTypes = {};

export default FacilityScreenHeader;
