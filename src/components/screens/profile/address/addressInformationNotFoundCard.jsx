import { MapPinnedIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import _ from "lodash";

import {
    profileAddressInformationNotFoundTitle,
    profileAddressInformationNotFoundMessage,
} from "@MELocalization/en";

import MEAlertCardComponent from "@MECommonComponents/card/alertCard";

const AddressInformationNotFoundCardComponent = () => {
  const { t } = useTranslation();

  return (
    <MEAlertCardComponent
      icon={
        <MapPinnedIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary/50" />
      }
      alertText={_.upperFirst(
        t("profileAddressInformationNotFoundTitle", {
          defaultValue: profileAddressInformationNotFoundTitle,
        }),
      )}
      alertMessage={_.upperFirst(
        t("profileAddressInformationNotFoundMessage", {
          defaultValue: profileAddressInformationNotFoundMessage,
        }),
      )}
    />
  );
};

export default AddressInformationNotFoundCardComponent;
