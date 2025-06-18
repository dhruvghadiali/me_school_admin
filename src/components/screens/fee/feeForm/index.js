import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { CircleAlertIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import { variants } from "@MEUtils/enums";
import { addFeeAPIPayload } from "@MEUtils/apiPayload";
import { addFee } from "@MERedux/fee/feeAction";
import { academicClassSelectionRequired } from "@MEUtils/validationMessage";
import {
  feeTypeSelectionLabel,
  feeTypeSelectionPlaceholder,
  academicClassSelectionLabel,
  academicClassSubmitButtonText,
  academicClassSelectionPlaceholder,
} from "@MELocalization/en";

import _ from "lodash";
import * as Yup from "yup";

import MEInput from "@MECommonComponents/input/meInput";
import MEButton from "@MECommonComponents/button/meButton";
import MESelect from "@MECommonComponents/select/meSelect";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";
import FeeFormSummaryTable from "@MEScreenComponents/fee/feeForm/feeFormSummaryTable";

const FeeForm = () => {
  const {
    fees,
    feeTypes,
    feeFormError,
    feeFormLoader,
    selectedEductionBoard,
    selectedAcademicClass,
    eductionBoardsWithAcademicClasses,
  } = useSelector((state) => state.fee);
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      academicClass: selectedAcademicClass,
      feeType: "",
      monthlyFee: 0,
      quarterlyFee: 0,
      halfYearlyFee: 0,
      yearlyFee: 0,
    },
    validationSchema: FeeSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(addFee(addFeeAPIPayload(values)));
    },
  });

  const onMonthlyFeeChange = (e) => {
    formik.handleChange(e);

    let value = e.target.value;

    if (value && _.isInteger(_.parseInt(value))) {
      value = _.parseInt(value);
      formik.setFieldValue("quarterlyFee", value * 3);
      formik.setFieldValue("halfYearlyFee", value * 6);
      formik.setFieldValue("yearlyFee", value * 12);
    } else {
      formik.setFieldValue("quarterlyFee", "");
      formik.setFieldValue("halfYearlyFee", "");
      formik.setFieldValue("yearlyFee", "");
    }
  };

  const onQuarterlyFeeChange = (e) => {
    formik.handleChange(e);

    let value = e.target.value;

    if (value && _.isInteger(_.parseInt(value))) {
      value = _.parseInt(value);
      formik.setFieldValue("halfYearlyFee", value * 2);
      formik.setFieldValue("yearlyFee", value * 4);
    } else {
      formik.setFieldValue("halfYearlyFee", "");
      formik.setFieldValue("yearlyFee", "");
    }
  };

  const onHalfYearlyFeeChange = (e) => {
    formik.handleChange(e);

    let value = e.target.value;

    if (value && _.isInteger(_.parseInt(value))) {
      value = _.parseInt(value);
      formik.setFieldValue("yearlyFee", value * 2);
    } else {
      formik.setFieldValue("yearlyFee", "");
    }
  };

  return (
    <>
      <div className="py-3" />
      {feeFormError && (
        <div className="bg-danger mb-2 flex items-center  rounded-md">
          <CircleAlertIcon className="text-accent ml-2" />
          <p className="text-accent p-2 text-left">{feeFormError}</p>
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
          placeholder={
            i18n.exists("academicClassSelectionPlaceholder")
              ? _.upperFirst(t("academicClassSelectionPlaceholder"))
              : _.upperFirst(academicClassSelectionPlaceholder)
          }
          items={
            _.find(
              eductionBoardsWithAcademicClasses,
              (item) => item.value === selectedEductionBoard
            )?.children || []
          }
          disabled={true}
          labelvariant={variants.DARK}
          selectVariant={variants.DARK}
          messagevariant={variants.DANGER}
          selectedVariant={variants.PRIMARY}
          message={formik.errors.academicClass}
          selectedValue={formik.values.academicClass}
          onValueChange={(value) => {}}
        />

        <MESelect
          id="feeType"
          label={
            i18n.exists("feeTypeSelectionLabel")
              ? _.upperFirst(t("feeTypeSelectionLabel"))
              : _.upperFirst(feeTypeSelectionLabel)
          }
          placeholder={
            i18n.exists("feeTypeSelectionPlaceholder")
              ? _.upperFirst(t("feeTypeSelectionPlaceholder"))
              : _.upperFirst(feeTypeSelectionPlaceholder)
          }
          items={_.filter(
            feeTypes,
            (feeType) =>
              !_.includes(
                _.map(fees, (fee) => _.toLower(fee.feeType)),
                _.toLower(feeType.label)
              )
          )}
          labelvariant={variants.DARK}
          selectVariant={variants.DARK}
          messagevariant={variants.DANGER}
          selectedVariant={variants.PRIMARY}
          message={formik.errors.feeType}
          selectedValue={formik.values.feeType}
          onValueChange={(value) => formik.setFieldValue("feeType", value)}
        />

        <MEInput
          id="monthlyFee"
          type={"text"}
          label={"Monthly Fee"}
          message={formik.errors.monthlyFee}
          value={formik.values.monthlyFee}
          labelvariant={variants.DARK}
          inputvariant={variants.DARK}
          messagevariant={variants.DANGER}
          onChange={onMonthlyFeeChange}
        />

        <MEInput
          id="quarterlyFee"
          type={"text"}
          label={"Quarterly Fee"}
          message={formik.errors.quarterlyFee}
          value={formik.values.quarterlyFee}
          labelvariant={variants.DARK}
          inputvariant={variants.DARK}
          messagevariant={variants.DANGER}
          onChange={onQuarterlyFeeChange}
        />

        <MEInput
          id="halfYearlyFee"
          type={"text"}
          label={"Half Yearly Fee"}
          message={formik.errors.halfYearlyFee}
          value={formik.values.halfYearlyFee}
          labelvariant={variants.DARK}
          inputvariant={variants.DARK}
          messagevariant={variants.DANGER}
          onChange={onHalfYearlyFeeChange}
        />

        <MEInput
          id="yearlyFee"
          type={"text"}
          label={"Yearly Fee"}
          message={formik.errors.yearlyFee}
          value={formik.values.yearlyFee}
          labelvariant={variants.DARK}
          inputvariant={variants.DARK}
          messagevariant={variants.DANGER}
          onChange={formik.handleChange}
        />

        <div className="py-2">
          <MEButton type="submit" buttonVariant={variants.SUCCESS}>
            {i18n.exists("academicClassSubmitButtonText")
              ? _.upperCase(t("academicClassSubmitButtonText"))
              : _.upperCase(academicClassSubmitButtonText)}
            {feeFormLoader && <MELoaderIcon />}
          </MEButton>
        </div>
      </form>

      <FeeFormSummaryTable formData={formik.values} />
    </>
  );
};

const FeeSchema = Yup.object().shape({
  academicClass: Yup.string().required(academicClassSelectionRequired),
  feeType: Yup.string().required("Fee type is required"),
  monthlyFee: Yup.number()
    .required("Monthly fee is required")
    .positive("Monthly fee must be a positive number")
    .integer("Monthly fee must be an integer")
    .min(1, "Monthly fee must be at least 1")
    .max(100000, "Monthly fee must be at most 100000"),
  quarterlyFee: Yup.number()
    .required("Quarterly fee is required")
    .positive("Quarterly fee must be a positive number")
    .integer("Quarterly fee must be an integer")
    .min(1, "Quarterly fee must be at least 1")
    .max(100000, "Quarterly fee must be at most 100000"),
  halfYearlyFee: Yup.number()
    .required("Half yearly fee is required")
    .positive("Half yearly fee must be a positive number")
    .integer("Half yearly fee must be an integer")
    .min(1, "Half yearly fee must be at least 1")
    .max(100000, "Half yearly fee must be at most 100000"),
  yearlyFee: Yup.number()
    .required("Yearly fee is required")
    .positive("Yearly fee must be a positive number")
    .integer("Yearly fee must be an integer")
    .min(1, "Yearly fee must be at least 1")
    .max(100000, "Yearly fee must be at most 100000"),
});

FeeForm.propTypes = {};

export default FeeForm;
