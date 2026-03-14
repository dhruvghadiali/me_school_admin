import { School } from "lucide-react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import _ from "lodash";

import {
  profileSchoolBasicInformationTitle,
  profileSchoolNameLabel,
  profileSchoolTypeLabel,
  profileSchoolEmailLabel,
  profileSchoolContactNumberLabel,
  profileSchoolEducationBoardLabel,
  profileSchoolAffiliateNumberLabel,
  profileSchoolEstablishedYearLabel,
} from "@MELocalization/en";

import MEInformationCardComponent from "@MECommonComponents/card/informationCard";

const SchoolInformationCardComponent = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authentication);

  // Extract school information with safe access and provide fallbacks
  const school = _.get(user, "school", {});
  const FALLBACK = "N/A";

  // Helper functions to format labels and values
  const getLabel = (t, key, defaultValue) =>
    _.startCase(t(key, { defaultValue }));

  // Format school name as "School Name (SHORTNAME)"
  const getSchoolName = (school) => {
    const name = _.startCase(school.name);
    const shortName = _.upperCase(school.shortName);
    return name ? `${name} (${shortName})` : FALLBACK;
  };

  // Format education boards as a comma-separated list
  const getEducationBoards = (boards) =>
    _.map(boards, (b) => _.startCase(b.educationBoard)).join(", ") || FALLBACK;

  // Format phone number with country code
  const getPhoneNumber = (phoneNumber) =>
    phoneNumber ? `+91 ${phoneNumber}` : FALLBACK;

  // Prepare the information list for the card
  const informationList = [
    {
      labelKey: "profileSchoolNameLabel",
      defaultLabel: profileSchoolNameLabel,
      value: getSchoolName(school),
    },
    {
      labelKey: "profileSchoolAffiliateNumberLabel",
      defaultLabel: profileSchoolAffiliateNumberLabel,
      value: _.upperCase(school.affiliateNumber) || FALLBACK,
    },
    {
      labelKey: "profileSchoolEstablishedYearLabel",
      defaultLabel: profileSchoolEstablishedYearLabel,
      value: school.establishedYear || FALLBACK,
    },
    {
      labelKey: "profileSchoolTypeLabel",
      defaultLabel: profileSchoolTypeLabel,
      value: _.startCase(school.schoolType) || FALLBACK,
    },
    {
      labelKey: "profileSchoolEducationBoardLabel",
      defaultLabel: profileSchoolEducationBoardLabel,
      value: getEducationBoards(school.educationBoards),
    },
    {
      labelKey: "profileSchoolEmailLabel",
      defaultLabel: profileSchoolEmailLabel,
      value: school.email || FALLBACK,
    },
    {
      labelKey: "profileSchoolContactNumberLabel",
      defaultLabel: profileSchoolContactNumberLabel,
      value: getPhoneNumber(school.phoneNumber),
    },
  ].map(({ labelKey, defaultLabel, value }) => ({
    label: getLabel(t, labelKey, defaultLabel),
    value,
  }));

  return (
    <MEInformationCardComponent
      titleIcon={<School className="w-5 h-5" />}
      title={
        _.upperCase(
          t("profileSchoolBasicInformationTitle", {
            defaultValue: profileSchoolBasicInformationTitle,
          }),
        ) || FALLBACK
      }
      informationList={informationList}
    />
  );
};

export default SchoolInformationCardComponent;
