import { useTranslation } from "react-i18next";
import {
  admissionDocumentHeader,
  admissionDocumentSubtitle,
} from "@MELocalization/en";

import _ from "lodash";

const AdmissionDocumentScreenHeader = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p className="text-3xl font-semibold">
        {_.startCase(t("admissionDocumentHeader",{defaultValue: admissionDocumentHeader}))}
      </p>
      <p className="text-sm mt-1">
        {_.upperFirst(t("admissionDocumentSubtitle",{defaultValue: admissionDocumentSubtitle}))}
      </p>
    </div>
  );
};

AdmissionDocumentScreenHeader.propTypes = {};

export default AdmissionDocumentScreenHeader;
