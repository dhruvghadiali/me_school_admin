import { useTranslation } from "react-i18next";
import { admissionHeader, admissionSubtitle } from "@MELocalization/en";

import _ from "lodash";

const AdmissionScreenHeader = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p className="text-3xl font-semibold">
        { _.startCase(t("admissionHeader", { defaultValue: admissionHeader }))}
      </p>
      <p className="text-sm mt-1">
        { _.upperFirst(t("admissionSubtitle", { defaultValue: admissionSubtitle }))}
      </p>
    </div>
  );
};

AdmissionScreenHeader.propTypes = {};

export default AdmissionScreenHeader;
