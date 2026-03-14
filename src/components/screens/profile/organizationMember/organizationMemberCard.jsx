import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Pencil, UsersIcon, Trash2, Plus } from "lucide-react";

import _ from "lodash";

import { variants } from "@MEUtils/enums";
import { PROFILE_FORM_SHEET_MODES } from "@MEHelpers/enums";
import { setMemberFormSheetStatus } from "@MERedux/profile/profileSlice";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@MEShadcnComponents/card";
import {
  profileOrganizationMemberTitle,
  profileOrganizationMemberCardTitle,
  profileOrganizationMemberNameLabel,
  profileOrganizationMemberCityLabel,
  profileOrganizationMemberEmailLabel,
  profileOrganizationMemberStateLabel,
  profileOrganizationMemberAddressLabel,
  profileOrganizationMemberZipcodeLabel,
  profileOrganizationMemberDistrictLabel,
  profileOrganizationMemberPositionLabel,
  profileOrganizationMemberAreaNameLabel,
  profileOrganizationMemberAddButtonLabel,
  profileOrganizationMemberContactNumberLabel,
  profileOrganizationMemberAadhaarNumberLabel,
} from "@MELocalization/en";

import MEButton from "@MECommonComponents/form/button/meButton";

const OrganizationMemberCardComponent = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authentication);

  const FALLBACK = "N/A";

  // Handler for edit button click - opens the member form sheet
  const handleEditClick = () =>
    dispatch(
      setMemberFormSheetStatus({
        status: true,
        mode: PROFILE_FORM_SHEET_MODES.EDIT,
      }),
    );

  // Handler for add button click - opens the member form sheet in add mode
  const handleAddClick = () =>
    dispatch(
      setMemberFormSheetStatus({
        status: true,
        mode: PROFILE_FORM_SHEET_MODES.ADD,
      }),
    );

  // Helper functions to format labels and values
  const getLabel = (t, key, defaultValue) =>
    _.startCase(t(key, { defaultValue }));

  // Format member name as "First Name Last Name"
  const getMemberName = (member) => {
    const firstName = _.startCase(member.firstName);
    const lastName = _.startCase(member.lastName);
    return firstName || lastName ? `${firstName} ${lastName}`.trim() : FALLBACK;
  };

  // Format phone number with country code
  const getPhoneNumber = (phoneNumber) =>
    phoneNumber ? `+91 ${phoneNumber}` : FALLBACK;

  // Prepare the information list for the card
  const informationList = (member) => {
    return [
      {
        labelKey: "profileOrganizationMemberNameLabel",
        defaultLabel: profileOrganizationMemberNameLabel,
        value: getMemberName(member),
      },
      {
        labelKey: "profileOrganizationMemberEmailLabel",
        defaultLabel: profileOrganizationMemberEmailLabel,
        value: member.email || FALLBACK,
      },
      {
        labelKey: "profileOrganizationMemberContactNumberLabel",
        defaultLabel: profileOrganizationMemberContactNumberLabel,
        value: getPhoneNumber(member.phoneNumber),
      },
      {
        labelKey: "profileOrganizationMemberAadhaarNumberLabel",
        defaultLabel: profileOrganizationMemberAadhaarNumberLabel,
        value: member.aadhaarNumber || FALLBACK,
      },
      {
        labelKey: "profileOrganizationMemberPositionLabel",
        defaultLabel: profileOrganizationMemberPositionLabel,
        value: _.startCase(member.position) || FALLBACK,
      },
      {
        labelKey: "profileOrganizationMemberAddressLabel",
        defaultLabel: profileOrganizationMemberAddressLabel,
        value: _.startCase(member.address) || FALLBACK,
      },
      {
        labelKey: "profileOrganizationMemberStateLabel",
        defaultLabel: profileOrganizationMemberStateLabel,
        value: _.startCase(member.state) || FALLBACK,
      },
      {
        labelKey: "profileOrganizationMemberDistrictLabel",
        defaultLabel: profileOrganizationMemberDistrictLabel,
        value: _.startCase(member.district) || FALLBACK,
      },
      {
        labelKey: "profileOrganizationMemberCityLabel",
        defaultLabel: profileOrganizationMemberCityLabel,
        value: _.startCase(member.city) || FALLBACK,
      },
      {
        labelKey: "profileOrganizationMemberAreaNameLabel",
        defaultLabel: profileOrganizationMemberAreaNameLabel,
        value: _.startCase(member.areaName) || FALLBACK,
      },
      {
        labelKey: "profileOrganizationMemberZipcodeLabel",
        defaultLabel: profileOrganizationMemberZipcodeLabel,
        value: member.zipcode || FALLBACK,
      },
    ].map(({ labelKey, defaultLabel, value }) => ({
      label: getLabel(t, labelKey, defaultLabel),
      value,
    }));
  };

  return (
    <Card className="bg-secondary/50 shadow-lg shadow-primary/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <UsersIcon className="w-5 h-5" />
          <CardTitle>
            {_.startCase(
              t("profileOrganizationMemberTitle", {
                defaultValue: profileOrganizationMemberTitle,
              }),
            )}
          </CardTitle>
        </div>
        <MEButton
          type="button"
          buttonVariant={variants.PRIMARY}
          buttonClassName="flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 h-auto"
          disabled={_.get(user, "organization.members", []).length >= 5}
          onClick={handleAddClick}
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">
            {_.startCase(
              t("profileOrganizationMemberAddButtonLabel", {
                defaultValue: profileOrganizationMemberAddButtonLabel,
              }),
            )}
          </span>
          <span className="xs:hidden">
            {_.startCase(
              t("profileOrganizationMemberAddButtonLabel", {
                defaultValue: profileOrganizationMemberAddButtonLabel,
              }),
            )}
          </span>
        </MEButton>
      </CardHeader>
      <CardContent>
        {_.map(_.get(user, "organization.members", []), (member, index) => (
          <div
            key={_.get(member, "id", index)}
            className="rounded-md px-5 py-4 mb-2 border border-primary/30"
          >
            <div className="flex items-center justify-between pb-4">
              <p className="text-sm font-medium text-primary">
                {_.toUpper(
                  `${t("profileOrganizationMemberCardTitle", { defaultValue: profileOrganizationMemberCardTitle })} ${index + 1}`,
                )}
              </p>
              <div className="flex items-center gap-1">
                <MEButton
                  type="button"
                  variant="outline"
                  buttonClassName="flex items-center gap-1 text-xs sm:text-sm px-1 py-1 h-auto"
                  onClick={handleEditClick}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </MEButton>

                <MEButton
                  type="button"
                  variant="outline"
                  buttonClassName="flex items-center gap-1 text-xs sm:text-sm px-1 py-1 h-auto"
                  disabled={_.get(user, "organization.members", []).length <= 1}
                  onClick={handleEditClick}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </MEButton>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {_.map(informationList(member), (field, subIndex) => (
                <div key={subIndex} className="space-y-1">
                  <p className="text-xs font-medium text-primary/60">
                    {field.label}
                  </p>
                  <p className="text-sm font-semibold text-primary wrap-break-word">
                    {field.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OrganizationMemberCardComponent;
