import { useFormik } from "formik";
import { CircleAlertIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";
import * as Yup from "yup";

import { variants } from "@MEUtils/enums";
import { objectIdRegex, phoneNumberRegex } from "@MEHelpers/regex";
import { setMemberFormSheetStatus } from "@MERedux/profile/profileSlice";
import {
  PROFILE_FORM_SHEET_MODES,
  ORGANIZATION_MEMBER_POSITION,
} from "@MEHelpers/enums";
import {
  addOrganizationMemberAPIPayload,
  updateOrganizationMemberAPIPayload,
} from "@MEUtils/apiPayload";
import {
  addOrganizationMember,
  updateOrganizationMember,
} from "@MERedux/profile/profileAction";
import {
  getAreasByCityId,
  createAreaOptions,
  createCityOptions,
  createStateOptions,
  getZipcodesByAreaId,
  createZipcodeOptions,
  getDistrictsByStateId,
  getCitiesByDistrictId,
  createDistrictOptions,
} from "@MEUtils/utility";
import {
  profileOrganizationMemberEmailMaxChar,
  profileOrganizationMemberEmailMinChar,
  profileOrganizationMemberAddressMaxChar,
  profileOrganizationMemberAddressMinChar,
  profileOrganizationMemberLastNameMaxChar,
  profileOrganizationMemberLastNameMinChar,
  profileOrganizationMemberPhoneNumberChar,
  profileOrganizationMemberPositionMaxChar,
  profileOrganizationMemberPositionMinChar,
  profileOrganizationMemberFirstNameMaxChar,
  profileOrganizationMemberFirstNameMinChar,
  profileOrganizationMemberAadhaarNumberChar,
} from "@MEUtils/validationConst";
import {
  profileOrganizationMemberStateRequired,
  profileOrganizationMemberDistrictRequired,
  profileOrganizationMemberCityRequired,
  profileOrganizationMemberAreaNameRequired,
  profileOrganizationMemberZipcodeRequired,
  profileOrganizationMemberStateInvalid,
  profileOrganizationMemberDistrictInvalid,
  profileOrganizationMemberCityInvalid,
  profileOrganizationMemberAreaNameInvalid,
  profileOrganizationMemberZipcodeInvalid,
  profileOrganizationMemberFirstNameRequired,
  profileOrganizationMemberFirstNameMinLength,
  profileOrganizationMemberFirstNameMaxLength,
  profileOrganizationMemberLastNameRequired,
  profileOrganizationMemberLastNameMinLength,
  profileOrganizationMemberLastNameMaxLength,
  profileOrganizationMemberEmailRequired,
  profileOrganizationMemberEmailInvalid,
  profileOrganizationMemberEmailMinLength,
  profileOrganizationMemberEmailMaxLength,
  profileOrganizationMemberPhoneNumberRequired,
  profileOrganizationMemberPhoneNumberInvalid,
  profileOrganizationMemberPhoneNumberMinLength,
  profileOrganizationMemberPhoneNumberMaxLength,
  profileOrganizationMemberPositionRequired,
  profileOrganizationMemberPositionMinLength,
  profileOrganizationMemberPositionMaxLength,
  profileOrganizationMemberAadhaarNumberRequired,
  profileOrganizationMemberAadhaarNumberMinLength,
  profileOrganizationMemberAadhaarNumberMaxLength,
  profileOrganizationMemberAddressRequired,
  profileOrganizationMemberAddressMinLength,
  profileOrganizationMemberAddressMaxLength,
} from "@MEUtils/validationMessage";
import {
  profileOrganizationMemberCityLabel,
  profileOrganizationMemberEmailLabel,
  profileOrganizationMemberStateLabel,
  profileOrganizationMemberZipcodeLabel,
  profileOrganizationMemberAddressLabel,
  profileOrganizationMemberAreaNameLabel,
  profileOrganizationMemberPositionLabel,
  profileOrganizationMemberLastNameLabel,
  profileOrganizationMemberDistrictLabel,
  profileOrganizationMemberFirstNameLabel,
  profileOrganizationMemberContactNumberLabel,
  profileOrganizationMemberAadhaarNumberLabel,
  profileOrganizationMemberCancelButtonLabel,
  profileOrganizationMemberSubmitButtonLabel,
} from "@MELocalization/en";

import MEInput from "@MECommonComponents/form/input/meInput";
import MESelect from "@MECommonComponents/form/select/meSelect";
import MEButton from "@MECommonComponents/form/button/meButton";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";

const OrganizationMemberFormComponent = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const {
    states,
    memberFormError,
    memberFormLoader,
    memberFormSheetMode,
    memberFormInitialValue,
  } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.authentication);

  // Initialize formik for managing the about school form state and validation
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: memberFormInitialValue,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      switch (memberFormSheetMode) {
        case PROFILE_FORM_SHEET_MODES.ADD:
          await dispatch(
            addOrganizationMember(
              addOrganizationMemberAPIPayload(user, values),
            ),
          );
          break;
        case PROFILE_FORM_SHEET_MODES.EDIT:
          await dispatch(
            updateOrganizationMember(
              updateOrganizationMemberAPIPayload(values),
            ),
          );
          break;
        default:
          break;
      }
    },
  });

  // Handler for cancel button click - resets the form and closes the sheet
  const onCancelClick = () => {
    formik.resetForm();
    dispatch(setMemberFormSheetStatus(false));
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6">
      {memberFormError && (
        <div className="bg-danger mb-2 flex items-center  rounded-md">
          <CircleAlertIcon className="text-accent ml-2" />
          <p className="text-accent p-2 text-left">
            {_.toLower(_.upperFirst(memberFormError))}
          </p>
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 sm:gap-x-6">
          <MEInput
            id="firstName"
            name="firstName"
            required
            label={_.upperFirst(
              t("profileOrganizationMemberFirstNameLabel", {
                defaultValue: profileOrganizationMemberFirstNameLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileOrganizationMemberFirstNameLabel", {
                defaultValue: profileOrganizationMemberFirstNameLabel,
              }),
            )}
            inputvariant={
              formik.errors.firstName ? variants.DANGER : variants.PRIMARY
            }
            messagevariant={
              formik.errors.firstName ? variants.DANGER : variants.PRIMARY
            }
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            message={formik.errors.firstName ? formik.errors.firstName : ""}
          />
          <MEInput
            id="lastName"
            name="lastName"
            required
            label={_.upperFirst(
              t("profileOrganizationMemberLastNameLabel", {
                defaultValue: profileOrganizationMemberLastNameLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileOrganizationMemberLastNameLabel", {
                defaultValue: profileOrganizationMemberLastNameLabel,
              }),
            )}
            inputvariant={
              formik.errors.lastName ? variants.DANGER : variants.PRIMARY
            }
            messagevariant={
              formik.errors.lastName ? variants.DANGER : variants.PRIMARY
            }
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            message={formik.errors.lastName ? formik.errors.lastName : ""}
          />
          <MEInput
            id="email"
            name="email"
            required
            label={_.upperFirst(
              t("profileOrganizationMemberEmailLabel", {
                defaultValue: profileOrganizationMemberEmailLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileOrganizationMemberEmailLabel", {
                defaultValue: profileOrganizationMemberEmailLabel,
              }),
            )}
            inputvariant={
              formik.errors.email ? variants.DANGER : variants.PRIMARY
            }
            messagevariant={
              formik.errors.email ? variants.DANGER : variants.PRIMARY
            }
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            message={formik.errors.email ? formik.errors.email : ""}
          />
          <MEInput
            id="phoneNumber"
            name="phoneNumber"
            required
            label={_.upperFirst(
              t("profileOrganizationMemberContactNumberLabel", {
                defaultValue: profileOrganizationMemberContactNumberLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileOrganizationMemberContactNumberLabel", {
                defaultValue: profileOrganizationMemberContactNumberLabel,
              }),
            )}
            inputvariant={
              formik.errors.phoneNumber ? variants.DANGER : variants.PRIMARY
            }
            messagevariant={
              formik.errors.phoneNumber ? variants.DANGER : variants.PRIMARY
            }
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            message={formik.errors.phoneNumber ? formik.errors.phoneNumber : ""}
          />
          <MEInput
            id="aadhaarNumber"
            name="aadhaarNumber"
            required
            label={_.upperFirst(
              t("profileOrganizationMemberAadhaarNumberLabel", {
                defaultValue: profileOrganizationMemberAadhaarNumberLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileOrganizationMemberAadhaarNumberLabel", {
                defaultValue: profileOrganizationMemberAadhaarNumberLabel,
              }),
            )}
            inputvariant={
              formik.errors.aadhaarNumber ? variants.DANGER : variants.PRIMARY
            }
            messagevariant={
              formik.errors.aadhaarNumber ? variants.DANGER : variants.PRIMARY
            }
            value={formik.values.aadhaarNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            message={
              formik.errors.aadhaarNumber ? formik.errors.aadhaarNumber : ""
            }
          />
          <MESelect
            id="position"
            label={_.upperFirst(
              t("profileOrganizationMemberPositionLabel", {
                defaultValue: profileOrganizationMemberPositionLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileOrganizationMemberPositionLabel", {
                defaultValue: profileOrganizationMemberPositionLabel,
              }),
            )}
            items={_.map(ORGANIZATION_MEMBER_POSITION, (position) => ({
              label: _.toLower(_.startCase(position)),
              value: _.toLower(position),
            }))}
            selectedValue={formik.values.position}
            message={formik.errors.position}
            selectVariant={variants.DARK}
            selectedVariant={variants.DARK}
            labelvariant={variants.DARK}
            messagevariant={variants.DANGER}
            onValueChange={(value) => formik.setFieldValue("position", value)}
          />
          <MEInput
            id="address"
            name="address"
            required
            label={_.upperFirst(
              t("profileOrganizationMemberAddressLabel", {
                defaultValue: profileOrganizationMemberAddressLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileOrganizationMemberAddressLabel", {
                defaultValue: profileOrganizationMemberAddressLabel,
              }),
            )}
            inputvariant={
              formik.errors.address ? variants.DANGER : variants.PRIMARY
            }
            messagevariant={
              formik.errors.address ? variants.DANGER : variants.PRIMARY
            }
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            message={formik.errors.address ? formik.errors.address : ""}
          />
          <MESelect
            id="state"
            label={_.upperFirst(
              t("profileOrganizationMemberStateLabel", {
                defaultValue: profileOrganizationMemberStateLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileOrganizationMemberStateLabel", {
                defaultValue: profileOrganizationMemberStateLabel,
              }),
            )}
            items={createStateOptions(states)}
            selectedValue={formik.values.state}
            message={formik.errors.state}
            selectVariant={variants.DARK}
            selectedVariant={variants.DARK}
            labelvariant={variants.DARK}
            messagevariant={variants.DANGER}
            onValueChange={(value) => {
              formik.setFieldValue("state", value);
              formik.setFieldValue("district", "");
              formik.setFieldValue("city", "");
              formik.setFieldValue("areaName", "");
              formik.setFieldValue("zipcode", "");
            }}
          />
          <MESelect
            id="district"
            label={_.upperFirst(
              t("profileOrganizationMemberDistrictLabel", {
                defaultValue: profileOrganizationMemberDistrictLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileOrganizationMemberDistrictLabel", {
                defaultValue: profileOrganizationMemberDistrictLabel,
              }),
            )}
            items={createDistrictOptions(
              getDistrictsByStateId(states, formik.values.state),
            )}
            selectedValue={formik.values.district}
            message={formik.errors.district}
            selectVariant={variants.DARK}
            selectedVariant={variants.DARK}
            labelvariant={variants.DARK}
            messagevariant={variants.DANGER}
            onValueChange={(value) => {
              formik.setFieldValue("district", value);
              formik.setFieldValue("city", "");
              formik.setFieldValue("areaName", "");
              formik.setFieldValue("zipcode", "");
            }}
          />
          <MESelect
            id="city"
            label={_.upperFirst(
              t("profileOrganizationMemberCityLabel", {
                defaultValue: profileOrganizationMemberCityLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileOrganizationMemberCityLabel", {
                defaultValue: profileOrganizationMemberCityLabel,
              }),
            )}
            items={createCityOptions(
              getCitiesByDistrictId(
                getDistrictsByStateId(states, formik.values.state),
                formik.values.district,
              ),
            )}
            selectedValue={formik.values.city}
            message={formik.errors.city}
            selectVariant={variants.DARK}
            selectedVariant={variants.DARK}
            labelvariant={variants.DARK}
            messagevariant={variants.DANGER}
            onValueChange={(value) => {
              formik.setFieldValue("city", value);
              formik.setFieldValue("areaName", "");
              formik.setFieldValue("zipcode", "");
            }}
          />
          <MESelect
            id="areaName"
            label={_.upperFirst(
              t("profileOrganizationMemberAreaNameLabel", {
                defaultValue: profileOrganizationMemberAreaNameLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileOrganizationMemberAreaNameLabel", {
                defaultValue: profileOrganizationMemberAreaNameLabel,
              }),
            )}
            items={createAreaOptions(
              getAreasByCityId(
                getCitiesByDistrictId(
                  getDistrictsByStateId(states, formik.values.state),
                  formik.values.district,
                ),
                formik.values.city,
              ),
            )}
            selectedValue={formik.values.areaName}
            message={formik.errors.areaName}
            selectVariant={variants.DARK}
            selectedVariant={variants.DARK}
            labelvariant={variants.DARK}
            messagevariant={variants.DANGER}
            onValueChange={(value) => {
              formik.setFieldValue("areaName", value);
              formik.setFieldValue("zipcode", "");
            }}
          />
          <MESelect
            id="zipcode"
            label={_.upperFirst(
              t("profileOrganizationMemberZipcodeLabel", {
                defaultValue: profileOrganizationMemberZipcodeLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileOrganizationMemberZipcodeLabel", {
                defaultValue: profileOrganizationMemberZipcodeLabel,
              }),
            )}
            items={createZipcodeOptions(
              getZipcodesByAreaId(
                getAreasByCityId(
                  getCitiesByDistrictId(
                    getDistrictsByStateId(states, formik.values.state),
                    formik.values.district,
                  ),
                  formik.values.city,
                ),
                formik.values.areaName,
              ),
            )}
            selectedValue={formik.values.zipcode}
            message={formik.errors.zipcode}
            selectVariant={variants.DARK}
            selectedVariant={variants.DARK}
            labelvariant={variants.DARK}
            messagevariant={variants.DANGER}
            onValueChange={(value) => {
              formik.setFieldValue("zipcode", value);
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8 pt-4 border-t border-primary/20">
          <MEButton
            type="button"
            buttonVariant={variants.SECONDARY}
            buttonClassName="w-full sm:w-auto"
            onClick={() => onCancelClick()}
            disabled={memberFormLoader}
          >
            {_.upperFirst(
              t("profileOrganizationMemberCancelButtonLabel", {
                defaultValue: profileOrganizationMemberCancelButtonLabel,
              }),
            )}
          </MEButton>
          <MEButton
            type="submit"
            buttonVariant={variants.PRIMARY}
            buttonClassName="w-full sm:w-auto"
            disabled={memberFormLoader || !formik.isValid}
          >
            {_.upperFirst(
              t("profileOrganizationMemberSubmitButtonLabel", {
                defaultValue: profileOrganizationMemberSubmitButtonLabel,
              }),
            )}
            {memberFormLoader && <MELoaderIcon />}
          </MEButton>
        </div>
      </form>
    </div>
  );
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .required(profileOrganizationMemberFirstNameRequired)
    .min(
      profileOrganizationMemberFirstNameMinChar,
      profileOrganizationMemberFirstNameMinLength,
    )
    .max(
      profileOrganizationMemberFirstNameMaxChar,
      profileOrganizationMemberFirstNameMaxLength,
    ),
  lastName: Yup.string()
    .trim()
    .required(profileOrganizationMemberLastNameRequired)
    .min(
      profileOrganizationMemberLastNameMinChar,
      profileOrganizationMemberLastNameMinLength,
    )
    .max(
      profileOrganizationMemberLastNameMaxChar,
      profileOrganizationMemberLastNameMaxLength,
    ),
  email: Yup.string()
    .trim()
    .email(profileOrganizationMemberEmailInvalid)
    .required(profileOrganizationMemberEmailRequired)
    .min(
      profileOrganizationMemberEmailMinChar,
      profileOrganizationMemberEmailMinLength,
    )
    .max(
      profileOrganizationMemberEmailMaxChar,
      profileOrganizationMemberEmailMaxLength,
    ),
  phoneNumber: Yup.string()
    .trim()
    .required(profileOrganizationMemberPhoneNumberRequired)
    .matches(phoneNumberRegex, profileOrganizationMemberPhoneNumberInvalid)
    .min(
      profileOrganizationMemberPhoneNumberChar,
      profileOrganizationMemberPhoneNumberMinLength,
    )
    .max(
      profileOrganizationMemberPhoneNumberChar,
      profileOrganizationMemberPhoneNumberMaxLength,
    ),
  aadhaarNumber: Yup.string()
    .trim()
    .required(profileOrganizationMemberAadhaarNumberRequired)
    .min(
      profileOrganizationMemberAadhaarNumberChar,
      profileOrganizationMemberAadhaarNumberMinLength,
    )
    .max(
      profileOrganizationMemberAadhaarNumberChar,
      profileOrganizationMemberAadhaarNumberMaxLength,
    ),
  position: Yup.string()
    .trim()
    .required(profileOrganizationMemberPositionRequired)
    .min(
      profileOrganizationMemberPositionMinChar,
      profileOrganizationMemberPositionMinLength,
    )
    .max(
      profileOrganizationMemberPositionMaxChar,
      profileOrganizationMemberPositionMaxLength,
    ),
  address: Yup.string()
    .trim()
    .required(profileOrganizationMemberAddressRequired)
    .min(
      profileOrganizationMemberAddressMinChar,
      profileOrganizationMemberAddressMinLength,
    )
    .max(
      profileOrganizationMemberAddressMaxChar,
      profileOrganizationMemberAddressMaxLength,
    ),
  state: Yup.string()
    .trim()
    .required(profileOrganizationMemberStateRequired)
    .matches(objectIdRegex, profileOrganizationMemberStateInvalid),
  district: Yup.string()
    .trim()
    .required(profileOrganizationMemberDistrictRequired)
    .matches(objectIdRegex, profileOrganizationMemberDistrictInvalid),
  city: Yup.string()
    .trim()
    .required(profileOrganizationMemberCityRequired)
    .matches(objectIdRegex, profileOrganizationMemberCityInvalid),
  areaName: Yup.string()
    .trim()
    .required(profileOrganizationMemberAreaNameRequired)
    .matches(objectIdRegex, profileOrganizationMemberAreaNameInvalid),
  zipcode: Yup.string()
    .trim()
    .required(profileOrganizationMemberZipcodeRequired)
    .matches(objectIdRegex, profileOrganizationMemberZipcodeInvalid),
});

export default OrganizationMemberFormComponent;
