import { School } from "lucide-react";
import { useTranslation } from "react-i18next";

import _ from "lodash";

import {
  profileSchoolInformationNotFoundTitle,
  profileSchoolInformationNotFoundMessage,
} from "@MELocalization/en";

import MEAlertCardComponent from "@MECommonComponents/card/alertCard";

const SchoolInformationNotFoundCardComponent = () => {
  const { t } = useTranslation();
  
  return (
    <MEAlertCardComponent
      icon={
        <School className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary/50" />
      }
      alertText={_.upperFirst(
        t("profileSchoolInformationNotFoundTitle", {
          defaultValue: profileSchoolInformationNotFoundTitle,
        }),
      )}
      alertMessage={_.upperFirst(
        t("profileSchoolInformationNotFoundMessage", {
          defaultValue: profileSchoolInformationNotFoundMessage,
        }),
      )}
    />
  );
};

export default SchoolInformationNotFoundCardComponent;
