import { useTranslation } from "react-i18next";
import { academicClassHeader, academicClassSubtitle } from "@MELocalization/en";

import _ from "lodash";

const AcademicClassScreenHeader = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <p className="text-3xl font-semibold">
        {i18n.exists("academicClassHeader")
          ? _.startCase(t("academicClassHeader"))
          : _.startCase(academicClassHeader)}
      </p>
      <p className="text-sm mt-1">
        {i18n.exists("academicClassSubtitle")
          ? _.upperFirst(t("academicClassSubtitle"))
          : _.upperFirst(academicClassSubtitle)}
      </p>
    </div>
  );
};

AcademicClassScreenHeader.propTypes = {};

export default AcademicClassScreenHeader;
