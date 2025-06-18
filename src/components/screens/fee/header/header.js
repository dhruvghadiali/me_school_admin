import { useTranslation } from "react-i18next";
import { feeHeader, feeSubtitle } from "@MELocalization/en";

import _ from "lodash";

const FeeScreenHeader = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <p className="text-3xl font-semibold">
        {i18n.exists("feeHeader")
          ? _.startCase(t("feeHeader"))
          : _.startCase(feeHeader)}
      </p>
      <p className="text-sm mt-1">
        {i18n.exists("feeSubtitle")
          ? _.upperFirst(t("feeSubtitle"))
          : _.upperFirst(feeSubtitle)}
      </p>
    </div>
  );
};

FeeScreenHeader.propTypes = {};

export default FeeScreenHeader;
