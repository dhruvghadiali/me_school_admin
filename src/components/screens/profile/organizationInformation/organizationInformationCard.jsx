import { useSelector } from "react-redux";
import { School2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";

import _ from "lodash";

import {
  profileOrganizationCityLabel,
  profileOrganizationEmailLabel,
  profileOrganizationStateLabel,
  profileOrganizationZipcodeLabel,
  profileOrganizationAddressLabel,
  profileOrganizationDistrictLabel,
  profileOrganizationAreaNameLabel,
  profileOrganizationNameLabel,
  profileOrganizationContactNumberLabel,
  profileOrganizationInformationTitle,
  profileOrganizationGovernmentRegistrationNumberLabel,
} from "@MELocalization/en";

import MEInformationCardComponent from "@MECommonComponents/card/informationCard";

const OrganizationInformationCardComponent = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authentication);

  const organizationInformation = _.get(user, "organization", {});
  const FALLBACK = "N/A";

  // Helper functions to format labels and values
  const getLabel = (t, key, defaultValue) =>
    _.startCase(t(key, { defaultValue }));

  // Format organization name as "Organization Name (SHORTNAME)"
  const getOrganizationName = (organization) => {
    const name = _.startCase(organization.name);
    const shortName = _.upperCase(organization.shortName);
    return name ? `${name} (${shortName})` : FALLBACK;
  };

  // Format phone number with country code
  const getPhoneNumber = (phoneNumber) =>
    phoneNumber ? `+91 ${phoneNumber}` : FALLBACK;

  // Prepare the information list for the card
  const informationList = [
    {
      labelKey: "profileOrganizationNameLabel",
      defaultLabel: profileOrganizationNameLabel,
      value: getOrganizationName(organizationInformation),
    },
    {
      labelKey: "profileOrganizationEmailLabel",
      defaultLabel: profileOrganizationEmailLabel,
      value: organizationInformation.email || FALLBACK,
    },
    {
      labelKey: "profileOrganizationContactNumberLabel",
      defaultLabel: profileOrganizationContactNumberLabel,
      value: getPhoneNumber(organizationInformation.phoneNumber),
    },
    {
      labelKey: "profileOrganizationGovernmentRegistrationNumberLabel",
      defaultLabel: profileOrganizationGovernmentRegistrationNumberLabel,
      value:
        _.upperCase(organizationInformation.governmentRegistrationNumber) ||
        FALLBACK,
    },
    {
      labelKey: "profileOrganizationAddressLabel",
      defaultLabel: profileOrganizationAddressLabel,
      value: _.startCase(organizationInformation.address) || FALLBACK,
    },
    {
      labelKey: "profileOrganizationStateLabel",
      defaultLabel: profileOrganizationStateLabel,
      value: _.upperCase(organizationInformation.state) || FALLBACK,
    },
    {
      labelKey: "profileOrganizationDistrictLabel",
      defaultLabel: profileOrganizationDistrictLabel,
      value: _.upperCase(organizationInformation.district) || FALLBACK,
    },
    {
      labelKey: "profileOrganizationCityLabel",
      defaultLabel: profileOrganizationCityLabel,
      value: _.upperCase(organizationInformation.city) || FALLBACK,
    },
    {
      labelKey: "profileOrganizationAreaNameLabel",
      defaultLabel: profileOrganizationAreaNameLabel,
      value: _.upperCase(organizationInformation.areaName) || FALLBACK,
    },
    {
      labelKey: "profileOrganizationZipcodeLabel",
      defaultLabel: profileOrganizationZipcodeLabel,
      value: _.upperCase(organizationInformation.zipcode) || FALLBACK,
    },
  ].map(({ labelKey, defaultLabel, value }) => ({
    label: getLabel(t, labelKey, defaultLabel),
    value,
  }));
  
  return (
    <MEInformationCardComponent
      informationList={informationList}
      titleIcon={<School2Icon className="w-5 h-5" />}
      title={_.upperCase(
        t("profileOrganizationInformationTitle", {
          defaultValue: profileOrganizationInformationTitle,
        }),
      )}
    />
  );
};

export default OrganizationInformationCardComponent;
