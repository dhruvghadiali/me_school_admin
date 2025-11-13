import { useTranslation } from "react-i18next";
import {
  admissionDocumentHeader,
  admissionDocumentSubtitle,
} from "@MELocalization/en";

import _ from "lodash";

const AdmissionDocumentScreenHeader = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <p className="text-3xl font-semibold">
        {i18n.exists("admissionDocumentHeader")
          ? _.startCase(t("admissionDocumentHeader"))
          : _.startCase(admissionDocumentHeader)}
      </p>
      <p className="text-sm mt-1">
        {i18n.exists("admissionDocumentSubtitle")
          ? _.upperFirst(t("admissionDocumentSubtitle"))
          : _.upperFirst(admissionDocumentSubtitle)}
      </p>
    </div>
  );
};

AdmissionDocumentScreenHeader.propTypes = {};

export default AdmissionDocumentScreenHeader;
