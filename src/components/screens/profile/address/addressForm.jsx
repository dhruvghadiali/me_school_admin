import { useFormik } from "formik";
import { CircleAlertIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";
import * as Yup from "yup";

import { variants } from "@MEUtils/enums";
import { objectIdRegex, timeRegex } from "@MEHelpers/regex";
import { updateSchoolAddressAPIPayload } from "@MEUtils/apiPayload";
import { updateSchoolAddress } from "@MERedux/profile/profileAction";
import { setAddressFormSheetStatus } from "@MERedux/profile/profileSlice";
import {
  getAreaIdByName,
  getCityIdByName,
  getStateIdByName,
  getAreasByCityId,
  createAreaOptions,
  createCityOptions,
  createStateOptions,
  getDistrictIdByName,
  getZipcodesByAreaId,
  createZipcodeOptions,
  getDistrictsByStateId,
  getZipcodeIdByZipcode,
  getCitiesByDistrictId,
  createDistrictOptions,
} from "@MEUtils/utility";
import {
  profileAddressFormAddressMinChar,
  profileAddressFormAddressMaxChar,
  profileAddressFormLatitudeMinChar,
  profileAddressFormLatitudeMaxChar,
  profileAddressFormLongitudeMinChar,
  profileAddressFormLongitudeMaxChar,
  profileAddressFormCampusAreaMinChar,
  profileAddressFormCampusAreaMaxChar,
  profileAddressFormBuildingAreaMinChar,
  profileAddressFormBuildingAreaMaxChar,
  profileAddressFormOutdoorAreaMinChar,
  profileAddressFormOutdoorAreaMaxChar,
} from "@MEUtils/validationConst";
import {
  profileAddressFormAddressRequired,
  profileAddressFormAddressMinLength,
  profileAddressFormAddressMaxLength,
  profileAddressFormStateRequired,
  profileAddressFormStateInvalid,
  profileAddressFormDistrictRequired,
  profileAddressFormDistrictInvalid,
  profileAddressFormCityRequired,
  profileAddressFormCityInvalid,
  profileAddressFormAreaNameRequired,
  profileAddressFormAreaNameInvalid,
  profileAddressFormZipcodeRequired,
  profileAddressFormZipcodeInvalid,
  profileAddressFormLatitudeMinLength,
  profileAddressFormLatitudeMaxLength,
  profileAddressFormLongitudeMinLength,
  profileAddressFormLongitudeMaxLength,
  profileAddressFormCampusAreaMinLength,
  profileAddressFormCampusAreaMaxLength,
  profileAddressFormBuildingAreaMinLength,
  profileAddressFormBuildingAreaMaxLength,
  profileAddressFormOutdoorAreaMinLength,
  profileAddressFormOutdoorAreaMaxLength,
  profileAddressFormLatitudeInvalid,
  profileAddressFormLongitudeInvalid,
  profileAddressFormCampusAreaInvalid,
  profileAddressFormBuildingAreaInvalid,
  profileAddressFormOutdoorAreaInvalid,
  profileAddressFormTimeInvalid,
} from "@MEUtils/validationMessage";
import {
  profileAddressFormCityLabel,
  profileAddressFormStateLabel,
  profileAddressFormAddressLabel,
  profileAddressFormZipcodeLabel,
  profileAddressFormAreaNameLabel,
  profileAddressFormDistrictLabel,
  profileAddressFormLatitudeLabel,
  profileAddressFormLongitudeLabel,
  profileAddressFormCampusAreaLabel,
  profileAddressFormBuildingAreaLabel,
  profileAddressFormOutdoorAreaLabel,
  profileAddressFormCancelButtonLabel,
  profileAddressFormSubmitButtonLabel,
  profileAddressSchoolHoursTitle,
  profileAddressAdministrationHoursTitle,
} from "@MELocalization/en";

import MEInput from "@MECommonComponents/form/input/meInput";
import MESelect from "@MECommonComponents/form/select/meSelect";
import MEButton from "@MECommonComponents/form/button/meButton";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";
import HoursSection from "@MEScreenComponents/profile/address/hoursSection";

const DAYS_OF_WEEK = [
  { key: "monday" },
  { key: "tuesday" },
  { key: "wednesday" },
  { key: "thursday" },
  { key: "friday" },
  { key: "saturday" },
  { key: "sunday" },
];

const createDefaultHoursState = () =>
  DAYS_OF_WEEK.reduce((acc, { key }) => {
    acc[key] = {
      openTime: "",
      closeTime: "",
      closed: false,
    };
    return acc;
  }, {});

const AddressFormComponent = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { states, addressFormError, addressFormLoader } = useSelector(
    (state) => state.profile,
  );
  const { user } = useSelector((state) => state.authentication);

  const school = _.get(user, "school", {});

  // Resolve member location names to their corresponding IDs
  const resolveMemberLocationIds = (member) => {
    const stateId = getStateIdByName(states, _.get(member, "state", ""));
    const districts = getDistrictsByStateId(states, stateId);
    const districtId = getDistrictIdByName(
      districts,
      _.get(member, "district", ""),
    );
    const cities = getCitiesByDistrictId(districts, districtId);
    const cityId = getCityIdByName(cities, _.get(member, "city", ""));
    const areaNames = getAreasByCityId(cities, cityId);
    const areaNameId = getAreaIdByName(
      areaNames,
      _.get(member, "areaName", ""),
    );
    const zipcodes = getZipcodesByAreaId(areaNames, areaNameId);
    const zipcodeId = getZipcodeIdByZipcode(
      zipcodes,
      _.get(member, "zipcode", ""),
    );

    return {
      state: stateId,
      district: districtId,
      city: cityId,
      areaName: areaNameId,
      zipcode: zipcodeId,
    };
  };

  // Initialize formik for managing the address form state and validation
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: _.get(school, "address", ""),
      latitude: _.get(school, "latitude", ""),
      longitude: _.get(school, "longitude", ""),
      campusArea: _.get(school, "campusArea", ""),
      buildingArea: _.get(school, "buildingArea", ""),
      outdoorArea: _.get(school, "outdoorArea", ""),
      schoolHours: _.get(school, "schoolHours", createDefaultHoursState()),
      administrativeHours: _.get(
        school,
        "administrativeHours",
        createDefaultHoursState(),
      ),
      ...resolveMemberLocationIds(school),
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);
      console.log("Payload", updateSchoolAddressAPIPayload(user, values));
      dispatch(
        updateSchoolAddress(updateSchoolAddressAPIPayload(user, values)),
      );
    },
  });

  // Handler for cancel button click - resets the form and closes the sheet
  const onCancelClick = () => {
    formik.resetForm();
    dispatch(setAddressFormSheetStatus(false));
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6">
      {addressFormError && (
        <div className="bg-danger mb-2 flex items-center  rounded-md">
          <CircleAlertIcon className="text-accent ml-2" />
          <p className="text-accent p-2 text-left">
            {_.toLower(_.upperFirst(addressFormError))}
          </p>
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 sm:gap-x-6">
          <MEInput
            id="address"
            name="address"
            required
            label={_.upperFirst(
              t("profileAddressFormAddressLabel", {
                defaultValue: profileAddressFormAddressLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileAddressFormAddressLabel", {
                defaultValue: profileAddressFormAddressLabel,
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
            required
            label={_.upperFirst(
              t("profileAddressFormStateLabel", {
                defaultValue: profileAddressFormStateLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileAddressFormStateLabel", {
                defaultValue: profileAddressFormStateLabel,
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
            required
            label={_.upperFirst(
              t("profileAddressFormDistrictLabel", {
                defaultValue: profileAddressFormDistrictLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileAddressFormDistrictLabel", {
                defaultValue: profileAddressFormDistrictLabel,
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
            required
            label={_.upperFirst(
              t("profileAddressFormCityLabel", {
                defaultValue: profileAddressFormCityLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileAddressFormCityLabel", {
                defaultValue: profileAddressFormCityLabel,
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
            required
            label={_.upperFirst(
              t("profileAddressFormAreaNameLabel", {
                defaultValue: profileAddressFormAreaNameLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileAddressFormAreaNameLabel", {
                defaultValue: profileAddressFormAreaNameLabel,
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
            required
            label={_.upperFirst(
              t("profileAddressFormZipcodeLabel", {
                defaultValue: profileAddressFormZipcodeLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileAddressFormZipcodeLabel", {
                defaultValue: profileAddressFormZipcodeLabel,
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
          <MEInput
            id="latitude"
            name="latitude"
            type="number"
            label={_.upperFirst(
              t("profileAddressFormLatitudeLabel", {
                defaultValue: profileAddressFormLatitudeLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileAddressFormLatitudeLabel", {
                defaultValue: profileAddressFormLatitudeLabel,
              }),
            )}
            inputvariant={
              formik.errors.latitude ? variants.DANGER : variants.PRIMARY
            }
            messagevariant={
              formik.errors.latitude ? variants.DANGER : variants.PRIMARY
            }
            value={formik.values.latitude}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            message={formik.errors.latitude ? formik.errors.latitude : ""}
          />
          <MEInput
            id="longitude"
            name="longitude"
            type="number"
            label={_.upperFirst(
              t("profileAddressFormLongitudeLabel", {
                defaultValue: profileAddressFormLongitudeLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileAddressFormLongitudeLabel", {
                defaultValue: profileAddressFormLongitudeLabel,
              }),
            )}
            inputvariant={
              formik.errors.longitude ? variants.DANGER : variants.PRIMARY
            }
            messagevariant={
              formik.errors.longitude ? variants.DANGER : variants.PRIMARY
            }
            value={formik.values.longitude}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            message={formik.errors.longitude ? formik.errors.longitude : ""}
          />
          <MEInput
            id="campusArea"
            name="campusArea"
            type="number"
            label={_.upperFirst(
              t("profileAddressFormCampusAreaLabel", {
                defaultValue: profileAddressFormCampusAreaLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileAddressFormCampusAreaLabel", {
                defaultValue: profileAddressFormCampusAreaLabel,
              }),
            )}
            inputvariant={
              formik.errors.campusArea ? variants.DANGER : variants.PRIMARY
            }
            messagevariant={
              formik.errors.campusArea ? variants.DANGER : variants.PRIMARY
            }
            value={formik.values.campusArea}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            message={formik.errors.campusArea ? formik.errors.campusArea : ""}
          />
          <MEInput
            id="buildingArea"
            name="buildingArea"
            type="number"
            label={_.upperFirst(
              t("profileAddressFormBuildingAreaLabel", {
                defaultValue: profileAddressFormBuildingAreaLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileAddressFormBuildingAreaLabel", {
                defaultValue: profileAddressFormBuildingAreaLabel,
              }),
            )}
            inputvariant={
              formik.errors.buildingArea ? variants.DANGER : variants.PRIMARY
            }
            messagevariant={
              formik.errors.buildingArea ? variants.DANGER : variants.PRIMARY
            }
            value={formik.values.buildingArea}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            message={
              formik.errors.buildingArea ? formik.errors.buildingArea : ""
            }
          />
          <MEInput
            id="outdoorArea"
            name="outdoorArea"
            type="number"
            label={_.upperFirst(
              t("profileAddressFormOutdoorAreaLabel", {
                defaultValue: profileAddressFormOutdoorAreaLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileAddressFormOutdoorAreaLabel", {
                defaultValue: profileAddressFormOutdoorAreaLabel,
              }),
            )}
            inputvariant={
              formik.errors.outdoorArea ? variants.DANGER : variants.PRIMARY
            }
            messagevariant={
              formik.errors.outdoorArea ? variants.DANGER : variants.PRIMARY
            }
            value={formik.values.outdoorArea}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            message={formik.errors.outdoorArea ? formik.errors.outdoorArea : ""}
          />
        </div>

        {/* School Hours */}
        <HoursSection
          title={t("profileAddressSchoolHoursTitle", {
            defaultValue: profileAddressSchoolHoursTitle,
          })}
          fieldPrefix="schoolHours"
          formik={formik}
        />

        {/* Administration Hours */}
        <HoursSection
          title={t("profileAddressAdministrationHoursTitle", {
            defaultValue: profileAddressAdministrationHoursTitle,
          })}
          fieldPrefix="administrativeHours"
          formik={formik}
        />

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8 pt-4 border-t border-primary/20">
          <MEButton
            type="button"
            buttonVariant={variants.SECONDARY}
            buttonClassName="w-full sm:w-auto"
            onClick={() => onCancelClick()}
            disabled={addressFormLoader}
          >
            {_.upperFirst(
              t("profileAddressFormCancelButtonLabel", {
                defaultValue: profileAddressFormCancelButtonLabel,
              }),
            )}
          </MEButton>
          <MEButton
            type="submit"
            buttonVariant={variants.PRIMARY}
            buttonClassName="w-full sm:w-auto"
            disabled={addressFormLoader}
          >
            {_.upperFirst(
              t("profileAddressFormSubmitButtonLabel", {
                defaultValue: profileAddressFormSubmitButtonLabel,
              }),
            )}
            {addressFormLoader && <MELoaderIcon />}
          </MEButton>
        </div>
      </form>
    </div>
  );
};

const dayHoursSchema = Yup.object().shape({
  openTime: Yup.string().when("closed", {
    is: false,
    then: (schema) => schema.matches(timeRegex, profileAddressFormTimeInvalid),
    otherwise: (schema) => schema.notRequired(),
  }),
  closeTime: Yup.string().when("closed", {
    is: false,
    then: (schema) => schema.matches(timeRegex, profileAddressFormTimeInvalid),
    otherwise: (schema) => schema.notRequired(),
  }),
  closed: Yup.boolean(),
});

const hoursSchema = Yup.object().shape(
  DAYS_OF_WEEK.reduce((acc, { key }) => {
    acc[key] = dayHoursSchema;
    return acc;
  }, {}),
);

const validationSchema = Yup.object({
  address: Yup.string()
    .trim()
    .required(profileAddressFormAddressRequired)
    .min(profileAddressFormAddressMinChar, profileAddressFormAddressMinLength)
    .max(profileAddressFormAddressMaxChar, profileAddressFormAddressMaxLength),
  state: Yup.string()
    .trim()
    .required(profileAddressFormStateRequired)
    .matches(objectIdRegex, profileAddressFormStateInvalid),
  district: Yup.string()
    .trim()
    .required(profileAddressFormDistrictRequired)
    .matches(objectIdRegex, profileAddressFormDistrictInvalid),
  city: Yup.string()
    .trim()
    .required(profileAddressFormCityRequired)
    .matches(objectIdRegex, profileAddressFormCityInvalid),
  areaName: Yup.string()
    .trim()
    .required(profileAddressFormAreaNameRequired)
    .matches(objectIdRegex, profileAddressFormAreaNameInvalid),
  zipcode: Yup.string()
    .trim()
    .required(profileAddressFormZipcodeRequired)
    .matches(objectIdRegex, profileAddressFormZipcodeInvalid),
  latitude: Yup.number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : value,
    )
    .nullable()
    .notRequired()
    .typeError(profileAddressFormLatitudeInvalid)
    .min(profileAddressFormLatitudeMinChar, profileAddressFormLatitudeMinLength)
    .max(
      profileAddressFormLatitudeMaxChar,
      profileAddressFormLatitudeMaxLength,
    ),
  longitude: Yup.number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : value,
    )
    .nullable()
    .notRequired()
    .typeError(profileAddressFormLongitudeInvalid)
    .min(
      profileAddressFormLongitudeMinChar,
      profileAddressFormLongitudeMinLength,
    )
    .max(
      profileAddressFormLongitudeMaxChar,
      profileAddressFormLongitudeMaxLength,
    ),
  campusArea: Yup.number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : value,
    )
    .nullable()
    .notRequired()
    .typeError(profileAddressFormCampusAreaInvalid)
    .min(
      profileAddressFormCampusAreaMinChar,
      profileAddressFormCampusAreaMinLength,
    )
    .max(
      profileAddressFormCampusAreaMaxChar,
      profileAddressFormCampusAreaMaxLength,
    ),
  buildingArea: Yup.number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : value,
    )
    .nullable()
    .notRequired()
    .typeError(profileAddressFormBuildingAreaInvalid)
    .min(
      profileAddressFormBuildingAreaMinChar,
      profileAddressFormBuildingAreaMinLength,
    )
    .max(
      profileAddressFormBuildingAreaMaxChar,
      profileAddressFormBuildingAreaMaxLength,
    ),
  outdoorArea: Yup.number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : value,
    )
    .nullable()
    .notRequired()
    .typeError(profileAddressFormOutdoorAreaInvalid)
    .min(
      profileAddressFormOutdoorAreaMinChar,
      profileAddressFormOutdoorAreaMinLength,
    )
    .max(
      profileAddressFormOutdoorAreaMaxChar,
      profileAddressFormOutdoorAreaMaxLength,
    ),
  schoolHours: hoursSchema,
  administrativeHours: hoursSchema,
});

export default AddressFormComponent;
