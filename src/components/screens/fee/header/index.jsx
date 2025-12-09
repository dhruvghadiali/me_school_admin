import { useTranslation } from "react-i18next";
import { feeHeader, feeSubtitle } from "@MELocalization/en";

import _ from "lodash";

const FeeScreenHeader = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p className="text-3xl font-semibold">
        {_.startCase(t("feeHeader", { defaultValue: feeHeader }))}
      </p>
      <p className="text-sm mt-1">
        {_.upperFirst(t("feeSubtitle", { defaultValue: feeSubtitle }))}
      </p>
    </div>
  );
};

FeeScreenHeader.propTypes = {};

export default FeeScreenHeader;
