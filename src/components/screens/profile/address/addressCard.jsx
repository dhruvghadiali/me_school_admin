import { useTranslation } from "react-i18next";
import { Pencil, MapPinnedIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";

import { variants } from "@MEUtils/enums";
import { setAddressFormSheetStatus } from "@MERedux/profile/profileSlice";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@MEShadcnComponents/card";
import {
  profileAddressLabel,
  profileAddressCityLabel,
  profileAddressStateLabel,
  profileAddressFridayLabel,
  profileAddressMondayLabel,
  profileAddressSundayLabel,
  profileAddressClosedLabel,
  profileAddressTuesdayLabel,
  profileAddressZipcodeLabel,
  profileAddressDistrictLabel,
  profileAddressLatitudeLabel,
  profileAddressAreaNameLabel,
  profileAddressThursdayLabel,
  profileAddressSaturdayLabel,
  profileAddressWednesdayLabel,
  profileAddressLongitudeLabel,
  profileAddressAdminNameLabel,
  profileAddressAdminEmailLabel,
  profileAddressEditButtonLabel,
  profileAddressCampusAreaLabel,
  profileAddressSchoolHoursTitle,
  profileAddressInformationTitle,
  profileAddressOutdoorAreaLabel,
  profileAddressBuildingAreaLabel,
  profileAddressAdminContactNumberLabel,
  profileAddressAdministrationHoursTitle,
} from "@MELocalization/en";

import MEButton from "@MECommonComponents/form/button/meButton";
import CampusHoursInformationComponent from "@MEScreenComponents/profile/address/campusHoursInformation";

const AddressCardComponent = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authentication);

  const dispatch = useDispatch();

  // Extract school information with safe access and provide fallbacks
  const school = _.get(user, "school", {});
  const FALLBACK = "N/A";
  const CLOSED = _.upperFirst(
    t("profileAddressClosedLabel", { defaultValue: profileAddressClosedLabel }),
  );

  const handleEditClick = () => dispatch(setAddressFormSheetStatus(true));

  // Helper functions to format labels and values
  const getLabel = (t, key, defaultValue) => {
    const translated = t(key, { defaultValue });
    return translated
      .split(" ")
      .map((word) => _.upperFirst(word))
      .join(" ");
  };

  const getAdminInformation = (user) => {
    const firstName = _.startCase(_.get(user, "firstName", ""));
    const lastName = _.startCase(_.get(user, "lastName", ""));
    const username = _.get(user, "username", "");

    return _.trim(`${firstName} ${lastName} (${username})`) || FALLBACK;
  };

  // Format phone number with country code
  const getPhoneNumber = (phoneNumber) =>
    phoneNumber ? `+91 ${phoneNumber}` : FALLBACK;

  // Prepare the information list for the card
  const informationList = [
    {
      labelKey: "profileAddressAdminNameLabel",
      defaultLabel: profileAddressAdminNameLabel,
      value: getAdminInformation(user),
    },
    {
      labelKey: "profileAddressAdminEmailLabel",
      defaultLabel: profileAddressAdminEmailLabel,
      value: _.get(user, "email", FALLBACK),
    },
    {
      labelKey: "profileAddressAdminContactNumberLabel",
      defaultLabel: profileAddressAdminContactNumberLabel,
      value: getPhoneNumber(_.get(user, "phoneNumber", "")),
    },
    {
      labelKey: "profileAddressLabel",
      defaultLabel: profileAddressLabel,
      value: _.upperFirst(_.get(school, "address", FALLBACK)),
    },
    {
      labelKey: "profileAddressStateLabel",
      defaultLabel: profileAddressStateLabel,
      value: _.upperCase(_.get(school, "state", FALLBACK)),
    },
    {
      labelKey: "profileAddressDistrictLabel",
      defaultLabel: profileAddressDistrictLabel,
      value: _.upperCase(_.get(school, "district", FALLBACK)),
    },
    {
      labelKey: "profileAddressCityLabel",
      defaultLabel: profileAddressCityLabel,
      value: _.upperCase(_.get(school, "city", FALLBACK)),
    },
    {
      labelKey: "profileAddressAreaNameLabel",
      defaultLabel: profileAddressAreaNameLabel,
      value: _.upperCase(_.get(school, "areaName", FALLBACK)),
    },
    {
      labelKey: "profileAddressZipcodeLabel",
      defaultLabel: profileAddressZipcodeLabel,
      value: _.get(school, "zipcode", FALLBACK),
    },
    {
      labelKey: "profileAddressLatitudeLabel",
      defaultLabel: profileAddressLatitudeLabel,
      value: _.get(school, "latitude", FALLBACK),
    },
    {
      labelKey: "profileAddressLongitudeLabel",
      defaultLabel: profileAddressLongitudeLabel,
      value: _.get(school, "longitude", FALLBACK),
    },
    {
      labelKey: "profileAddressCampusAreaLabel",
      defaultLabel: profileAddressCampusAreaLabel,
      value: _.get(school, "campusArea", FALLBACK),
    },
    {
      labelKey: "profileAddressBuildingAreaLabel",
      defaultLabel: profileAddressBuildingAreaLabel,
      value: _.get(school, "buildingArea", FALLBACK),
    },
    {
      labelKey: "profileAddressOutdoorAreaLabel",
      defaultLabel: profileAddressOutdoorAreaLabel,
      value: _.get(school, "outdoorArea", FALLBACK),
    },
  ].map(({ labelKey, defaultLabel, value }) => ({
    label: getLabel(t, labelKey, defaultLabel),
    value,
  }));

  const schoolHours = [
    {
      labelKey: "profileAddressMondayLabel",
      defaultLabel: profileAddressMondayLabel,
      value: _.get(school, "monday", CLOSED),
    },
    {
      labelKey: "profileAddressTuesdayLabel",
      defaultLabel: profileAddressTuesdayLabel,
      value: _.get(school, "tuesday", CLOSED),
    },
    {
      labelKey: "profileAddressWednesdayLabel",
      defaultLabel: profileAddressWednesdayLabel,
      value: _.get(school, "wednesday", CLOSED),
    },
    {
      labelKey: "profileAddressThursdayLabel",
      defaultLabel: profileAddressThursdayLabel,
      value: _.get(school, "thursday", CLOSED),
    },
    {
      labelKey: "profileAddressFridayLabel",
      defaultLabel: profileAddressFridayLabel,
      value: _.get(school, "friday", CLOSED),
    },
    {
      labelKey: "profileAddressSaturdayLabel",
      defaultLabel: profileAddressSaturdayLabel,
      value: _.get(school, "saturday", CLOSED),
    },
    {
      labelKey: "profileAddressSundayLabel",
      defaultLabel: profileAddressSundayLabel,
      value: _.get(school, "sunday", CLOSED),
    },
  ].map(({ labelKey, defaultLabel, value }) => ({
    label: getLabel(t, labelKey, defaultLabel),
    value,
  }));

  const administrationHours = [
    {
      labelKey: "profileAddressMondayLabel",
      defaultLabel: profileAddressMondayLabel,
      value: _.get(school, "monday", CLOSED),
    },
    {
      labelKey: "profileAddressTuesdayLabel",
      defaultLabel: profileAddressTuesdayLabel,
      value: _.get(school, "tuesday", CLOSED),
    },
    {
      labelKey: "profileAddressWednesdayLabel",
      defaultLabel: profileAddressWednesdayLabel,
      value: _.get(school, "wednesday", CLOSED),
    },
    {
      labelKey: "profileAddressThursdayLabel",
      defaultLabel: profileAddressThursdayLabel,
      value: _.get(school, "thursday", CLOSED),
    },
    {
      labelKey: "profileAddressFridayLabel",
      defaultLabel: profileAddressFridayLabel,
      value: _.get(school, "friday", CLOSED),
    },
    {
      labelKey: "profileAddressSaturdayLabel",
      defaultLabel: profileAddressSaturdayLabel,
      value: _.get(school, "saturday", CLOSED),
    },
    {
      labelKey: "profileAddressSundayLabel",
      defaultLabel: profileAddressSundayLabel,
      value: _.get(school, "sunday", CLOSED),
    },
  ].map(({ labelKey, defaultLabel, value }) => ({
    label: getLabel(t, labelKey, defaultLabel),
    value,
  }));

  return (
    <Card className="bg-secondary/50 shadow-lg shadow-primary/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <MapPinnedIcon className="w-5 h-5" />
          <CardTitle>
            {_.upperCase(
              t("profileAddressInformationTitle", {
                defaultValue: profileAddressInformationTitle,
              }),
            )}
          </CardTitle>
        </div>
        <MEButton
          type="button"
          buttonVariant={variants.PRIMARY}
          buttonClassName="flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 h-auto"
          onClick={() => handleEditClick()}
        >
          <Pencil className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">
            {_.upperFirst(
              t("profileAddressEditButtonLabel", {
                defaultValue: profileAddressEditButtonLabel,
              }),
            )}
          </span>
          <span className="xs:hidden">
            {_.upperFirst(
              t("profileAddressEditButtonLabel", {
                defaultValue: profileAddressEditButtonLabel,
              }),
            )}
          </span>
        </MEButton>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {_.map(informationList, (information, index) => (
            <div key={index} className="space-y-1">
              <p className="text-xs font-medium text-primary/60">
                {information.label}
              </p>
              <p className="text-sm font-semibold text-primary wrap-break-word">
                {information.value || "N/A"}
              </p>
            </div>
          ))}
        </div>
        {/* School Hours */}
        <CampusHoursInformationComponent
          hours={schoolHours}
          title={_.startCase(
            t("profileAddressSchoolHoursTitle", {
              defaultValue: profileAddressSchoolHoursTitle,
            }),
          )}
        />
        {/* Administration Hours */}
        <CampusHoursInformationComponent
          hours={administrationHours}
          title={_.startCase(
            t("profileAddressAdministrationHoursTitle", {
              defaultValue: profileAddressAdministrationHoursTitle,
            }),
          )}
        />
      </CardContent>
    </Card>
  );
};

export default AddressCardComponent;
