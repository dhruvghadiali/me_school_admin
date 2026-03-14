import { Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import _ from "lodash";

import {
  profileOrganizationInformationNotFoundTitle,
  profileOrganizationInformationNotFoundMessage,
} from "@MELocalization/en";

import MEAlertCardComponent from "@MECommonComponents/card/alertCard";

const OrganizationInformationNotFoundCardComponent = () => {
  const { t } = useTranslation();

  return (
    <MEAlertCardComponent
      icon={
        <Building2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary/50" />
      }
      alertText={_.upperFirst(
        t("profileOrganizationInformationNotFoundTitle", {
          defaultValue: profileOrganizationInformationNotFoundTitle,
        }),
      )}
      alertMessage={_.upperFirst(
        t("profileOrganizationInformationNotFoundMessage", {
          defaultValue: profileOrganizationInformationNotFoundMessage,
        }),
      )}
    />
  );
};

export default OrganizationInformationNotFoundCardComponent;
