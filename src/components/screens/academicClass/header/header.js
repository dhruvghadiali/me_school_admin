import { useTranslation } from "react-i18next";
import { academicClassHeader, academicClassSubtitle } from "@MELocalization/en";

import _ from "lodash";

const AcademicClassScreenHeader = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p className="text-3xl font-semibold">
        { _.startCase(t("academicClassHeader", { defaultValue: academicClassHeader }))}
      </p>
      <p className="text-sm mt-1">
        { _.upperFirst(t("academicClassSubtitle", { defaultValue: academicClassSubtitle }))}
      </p>
    </div>
  );
};

AcademicClassScreenHeader.propTypes = {};

export default AcademicClassScreenHeader;
