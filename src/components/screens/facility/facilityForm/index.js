import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { CircleAlertIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import { variants } from "@MEUtils/enums";
import { facilitySelectionRequired } from "@MEUtils/validationMessage";
import {
  facilitySelectionLabel,
  facilitySelectionPlaceholder,
  admissionDocumentSubmitButtonText,
} from "@MELocalization/en";

import _ from "lodash";
import * as Yup from "yup";

import MEButton from "@MECommonComponents/button/meButton";
import MESelect from "@MECommonComponents/select/meSelect";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";

const FacilityForm = () => {
  const {
    selectedFacilityType,
    facilityTypes,
    facilities,
    facilityFormLoader,
    facilityFormError,
  } = useSelector((state) => state.facility);
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      facility: "",
    },
    validationSchema: FacilityFormSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {},
  });

  return (
    <>
      <div className="py-3" />
      {facilityFormError && (
        <div className="bg-danger mb-2 flex items-center  rounded-md">
          <CircleAlertIcon className="text-accent ml-2" />
          <p className="text-accent p-2 text-left">{facilityFormError}</p>
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <MESelect
          id="facility"
          label={
            i18n.exists("facilitySelectionLabel")
              ? _.upperFirst(t("facilitySelectionLabel"))
              : _.upperFirst(facilitySelectionLabel)
          }
          placeholder={
            i18n.exists("facilitySelectionPlaceholder")
              ? _.upperFirst(t("facilitySelectionPlaceholder"))
              : _.upperFirst(facilitySelectionPlaceholder)
          }
          items={_.filter(
            _.find(facilityTypes, { value: selectedFacilityType })
              ?.facilities || [],
            (_data) =>
              !_.includes(
                _.map(
                  _.find(facilities, { id: selectedFacilityType })
                    ?.facilities || [],
                  (facility) => _.toLower(facility.isAvailable)
                ),
                _.toLower("yes")
              )
          )}
          labelvariant={variants.DARK}
          selectVariant={variants.DARK}
          messagevariant={variants.DANGER}
          selectedVariant={variants.DARK}
          message={formik.errors.facility}
          selectedValue={formik.values.facility}
          onValueChange={(value) => formik.setFieldValue("facility", value)}
        />

        <div className="py-2">
          <MEButton type="submit" buttonVariant={variants.SUCCESS}>
            {i18n.exists("admissionDocumentSubmitButtonText")
              ? _.upperCase(t("admissionDocumentSubmitButtonText"))
              : _.upperCase(admissionDocumentSubmitButtonText)}
            {facilityFormLoader && <MELoaderIcon />}
          </MEButton>
        </div>
      </form>
    </>
  );
};

const FacilityFormSchema = Yup.object().shape({
  facility: Yup.string().required(facilitySelectionRequired),
});

FacilityForm.propTypes = {};

export default FacilityForm;
