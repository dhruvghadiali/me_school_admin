import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { CircleAlertIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import { variants } from "@MEUtils/enums";
// import { addNewAcademicClassAPIPayload } from "@MEUtils/apiPayload";
import { academicClassSelectionRequired } from "@MEUtils/validationMessage";
// import { addAcademicClasses } from "@MERedux/academicClass/academicClassAction";
import {
  academicClassSelectionLabel,
  academicClassSubmitButtonText,
  academicClassSelectionPlaceholder,
} from "@MELocalization/en";

import _ from "lodash";
import * as Yup from "yup";

import MEButton from "@MECommonComponents/form/button/meButton";
import MESelect from "@MECommonComponents/form/select/meSelect";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";

const AcademicClassForm = () => {
  const {
    defaultAcademicClasses,
    academicClasses,
    academicClassFormLoader,
    academicClassFormError,
    selectedEducationBoard,
    school,
  } = useSelector((state) => state.academicClass);
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      academicClass: "",
    },
    validationSchema: AcademicClassSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(
        // addAcademicClasses(
        //   addNewAcademicClassAPIPayload({
        //     academicClass: values.academicClass,
        //     school: school,
        //     eductionBoard: selectedEducationBoard,
        //   })
        // )
      );
    },
  });

  return (
    <>
      <div className="py-3" />
      {academicClassFormError && (
        <div className="bg-danger mb-2 flex items-center  rounded-md">
          <CircleAlertIcon className="text-accent ml-2" />
          <p className="text-accent p-2 text-left">{academicClassFormError}</p>
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <MESelect
          id="academicClass"
          label={
            i18n.exists("academicClassSelectionLabel")
              ? _.upperFirst(t("academicClassSelectionLabel"))
              : _.upperFirst(academicClassSelectionLabel)
          }
          items={_.filter(
            defaultAcademicClasses,
            (defaultAcademicClass) =>
              !_.includes(
                academicClasses.map((academicClass) =>
                  _.toLower(academicClass.academicClass)
                ),
                _.toLower(defaultAcademicClass.label)
              )
          )}
          placeholder={
            i18n.exists("academicClassSelectionPlaceholder")
              ? _.upperFirst(t("academicClassSelectionPlaceholder"))
              : _.upperFirst(academicClassSelectionPlaceholder)
          }
          selectedValue={formik.values.academicClass}
          message={formik.errors.academicClass}
          selectVariant={variants.DARK}
          selectedVariant={variants.DARK}
          labelvariant={variants.DARK}
          messagevariant={variants.DANGER}
          onValueChange={(value) =>
            formik.setFieldValue("academicClass", value)
          }
        />
        <div className="py-2">
          <MEButton type="submit" buttonVariant={variants.SUCCESS}>
            {i18n.exists("academicClassSubmitButtonText")
              ? _.upperCase(t("academicClassSubmitButtonText"))
              : _.upperCase(academicClassSubmitButtonText)}
            {academicClassFormLoader && <MELoaderIcon />}
          </MEButton>
        </div>
      </form>
    </>
  );
};

const AcademicClassSchema = Yup.object().shape({
  academicClass: Yup.string().required(academicClassSelectionRequired),
});

AcademicClassForm.propTypes = {};

export default AcademicClassForm;
