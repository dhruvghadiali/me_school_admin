import { useTranslation } from "react-i18next";
import { admissionHub } from "@MELocalizationEn/admission/admissionTranslationEn";

import _ from "lodash";

const AdmissionScreenHeader = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <p className="text-3xl font-semibold">
        {i18n.exists("admissionHubHeader")
          ? _.startCase(t("admissionHubHeader"))
          : _.startCase(admissionHub.admissionHubHeader)}
      </p>
      <p className="text-sm mt-1">
        {i18n.exists("admissionHubSubtitle")
          ? _.upperFirst(t("admissionHubSubtitle"))
          : _.upperFirst(admissionHub.admissionHubSubtitle)}
      </p>
    </div>
  );
};

AdmissionScreenHeader.propTypes = {};

export default AdmissionScreenHeader;
