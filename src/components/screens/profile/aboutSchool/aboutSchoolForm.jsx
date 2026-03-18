import { useFormik } from "formik";
import { CircleAlertIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";
import * as Yup from "yup";

import { variants } from "@MEUtils/enums";
import { updateSchoolAbout } from "@MERedux/profile/profileAction";
import { setAboutSchoolFormSheetStatus } from "@MERedux/profile/profileSlice";
import { schoolAboutAPIPayload } from "@MEUtils/apiPayload";
import {
  profileSchoolAboutMaxChar,
  profileSchoolAboutMinChar,
} from "@MEUtils/validationConst";
import {
  profileSchoolAboutRequired,
  profileSchoolAboutMaxLength,
  profileSchoolAboutMinLength,
} from "@MEUtils/validationMessage";
import {
  profileSchoolAboutTextareaLabel,
  profileSchoolAboutTextareaPlaceholder,
  profileSchoolAboutFormSubmitButtonLabel,
  profileSchoolAboutFormCancelButtonLabel,
} from "@MELocalization/en";

import MEButton from "@MECommonComponents/form/button/meButton";
import METextarea from "@MECommonComponents/form/input/meTextarea";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";

const AboutSchoolFormComponent = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { schoolAboutFormLoader, schoolAboutFormError } = useSelector(
    (state) => state.profile,
  );
  const { user } = useSelector((state) => state.authentication);

  // Initialize formik for managing the about school form state and validation
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      about: _.get(user, "school.about", ""),
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(updateSchoolAbout(schoolAboutAPIPayload(user, values)));
    },
  });

  // Handler for cancel button click - resets the form and closes the sheet
  const onCancelClick = () => {
    formik.resetForm();
    dispatch(setAboutSchoolFormSheetStatus(false));
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6">
      {schoolAboutFormError && (
        <div className="bg-danger mb-2 flex items-center  rounded-md">
          <CircleAlertIcon className="text-accent ml-2" />
          <p className="text-accent p-2 text-left">
            {_.toLower(_.upperFirst(schoolAboutFormError))}
          </p>
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          <METextarea
            id="about"
            name="about"
            label={_.upperFirst(
              t("profileSchoolAboutTextareaLabel", {
                defaultValue: profileSchoolAboutTextareaLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("profileSchoolAboutTextareaPlaceholder", {
                defaultValue: profileSchoolAboutTextareaPlaceholder,
              }),
            )}
            rows={8}
            required
            inputvariant={
              formik.touched.about && formik.errors.about
                ? variants.DANGER
                : variants.PRIMARY
            }
            messagevariant={
              formik.touched.about && formik.errors.about
                ? variants.DANGER
                : variants.PRIMARY
            }
            value={formik.values.about}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            message={
              formik.touched.about && formik.errors.about
                ? formik.errors.about
                : ""
            }
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8 pt-4 border-t border-primary/20">
          <MEButton
            type="button"
            buttonVariant={variants.SECONDARY}
            buttonClassName="w-full sm:w-auto"
            onClick={() => onCancelClick()}
            disabled={schoolAboutFormLoader}
          >
            {_.upperFirst(
              t("profileSchoolAboutFormCancelButtonLabel", {
                defaultValue: profileSchoolAboutFormCancelButtonLabel,
              }),
            )}
          </MEButton>
          <MEButton
            type="submit"
            buttonVariant={variants.PRIMARY}
            buttonClassName="w-full sm:w-auto"
            disabled={schoolAboutFormLoader || !formik.isValid}
          >
            {_.upperFirst(
              t("profileSchoolAboutFormSubmitButtonLabel", {
                defaultValue: profileSchoolAboutFormSubmitButtonLabel,
              }),
            )}
            {schoolAboutFormLoader && <MELoaderIcon />}
          </MEButton>
        </div>
      </form>
    </div>
  );
};

const validationSchema = Yup.object({
  about: Yup.string()
    .trim()
    .min(profileSchoolAboutMinChar, profileSchoolAboutMinLength)
    .max(profileSchoolAboutMaxChar, profileSchoolAboutMaxLength)
    .required(profileSchoolAboutRequired),
});

export default AboutSchoolFormComponent;
