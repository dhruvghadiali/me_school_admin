import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { CircleAlertIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import { variants } from "@MEUtils/enums";
import { addFee, updateFee } from "@MERedux/fee/feeAction";
import { addFeeAPIPayload, updateFeeAPIPayload } from "@MEUtils/apiPayload";

import {
  yearlyFeeLabel,
  monthlyFeeLabel,
  quarterlyFeeLabel,
  halfYearlyFeeLabel,
  feeTypeSelectionLabel,
  feeTypeSelectionPlaceholder,
  academicClassSelectionLabel,
  academicClassSubmitButtonText,
  academicClassSelectionPlaceholder,
} from "@MELocalization/en";
import {
  academicClassSelectionRequired,
  feeTypeSelectionRequired,
  monthlyFeeRequired,
  monthlyFeeMinValue,
  monthlyFeeMaxValue,
  monthlyFeeIntegerNumber,
  monthlyFeePositiveNumber,
  quarterlyFeeRequired,
  quarterlyFeeMinValue,
  quarterlyFeeMaxValue,
  quarterlyFeeIntegerNumber,
  quarterlyFeePositiveNumber,
  halfYearlyFeeRequired,
  halfYearlyFeeMinValue,
  halfYearlyFeeMaxValue,
  halfYearlyFeeIntegerNumber,
  halfYearlyFeePositiveNumber,
  yearlyFeeRequired,
  yearlyFeeMinValue,
  yearlyFeeMaxValue,
  yearlyFeeIntegerNumber,
  yearlyFeePositiveNumber,
} from "@MEUtils/validationMessage";

import _ from "lodash";
import * as Yup from "yup";

import MEInput from "@MECommonComponents/form/input/meInput";
import MEButton from "@MECommonComponents/form/button/meButton";
import MESelect from "@MECommonComponents/form/select/meSelect";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";
import FeeFormSummaryTable from "@MEScreenComponents/fee/feeForm/feeFormSummaryTable";

const FeeForm = () => {
  const {
    fees,
    feeTypes,
    feeFormError,
    feeFormLoader,
    selectedEductionBoard,
    feeFormData,
    eductionBoardsWithAcademicClasses,
  } = useSelector((state) => state.fee);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      academicClass: feeFormData.academicClass,
      feeType: feeFormData.feeTypeValue,
      monthlyFee: feeFormData.monthlyFee,
      quarterlyFee: feeFormData.quarterlyFee,
      halfYearlyFee: feeFormData.halfYearlyFee,
      yearlyFee: feeFormData.yearlyFee,
    },
    validationSchema: FeeSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      feeFormData.id
        ? dispatch(updateFee(updateFeeAPIPayload(values, feeFormData.id)))
        : dispatch(addFee(addFeeAPIPayload(values)));
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
          label={_.upperFirst(
            t("academicClassSelectionLabel", {
              defaultValue: academicClassSelectionLabel,
            })
          )}
          placeholder={_.upperFirst(
            t("academicClassSelectionPlaceholder", {
              defaultValue: academicClassSelectionPlaceholder,
            })
          )}
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
          selectedVariant={variants.DARK}
          message={formik.errors.academicClass}
          selectedValue={formik.values.academicClass}
          onValueChange={(value) => {}}
        />

        <MESelect
          id="feeType"
          label={_.upperFirst(
            t("feeTypeSelectionLabel", {
              defaultValue: feeTypeSelectionLabel,
            })
          )}
          placeholder={_.upperFirst(
            t("feeTypeSelectionPlaceholder", {
              defaultValue: feeTypeSelectionPlaceholder,
            })
          )}
          items={[
            ..._.filter(
              feeTypes,
              (feeType) =>
                !_.includes(
                  _.map(fees, (fee) => _.toLower(fee.feeType)),
                  _.toLower(feeType.label)
                )
            ),
            feeFormData.id && {
              label: feeFormData.feeTypeLabel,
              value: feeFormData.feeTypeValue,
            },
          ]}
          disabled={feeFormData.id ? true : false}
          labelvariant={variants.DARK}
          selectVariant={variants.DARK}
          messagevariant={variants.DANGER}
          selectedVariant={variants.DARK}
          message={formik.errors.feeType}
          selectedValue={formik.values.feeType}
          onValueChange={(value) => formik.setFieldValue("feeType", value)}
        />

        <MEInput
          id="monthlyFee"
          type={"text"}
          label={_.upperFirst(
            t("monthlyFeeLabel", {
              defaultValue: monthlyFeeLabel,
            })
          )}
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
          label={_.upperFirst(
            t("quarterlyFeeLabel", {
              defaultValue: quarterlyFeeLabel,
            })
          )}
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
          label={_.upperFirst(
            t("halfYearlyFeeLabel", {
              defaultValue: halfYearlyFeeLabel,
            })
          )}
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
          label={_.upperFirst(
            t("yearlyFeeLabel", {
              defaultValue: yearlyFeeLabel,
            })
          )}
          message={formik.errors.yearlyFee}
          value={formik.values.yearlyFee}
          labelvariant={variants.DARK}
          inputvariant={variants.DARK}
          messagevariant={variants.DANGER}
          onChange={formik.handleChange}
        />

        <div className="py-2">
          <MEButton type="submit" buttonVariant={variants.SUCCESS}>
            {_.upperCase(
              t("academicClassSubmitButtonText", {
                defaultValue: academicClassSubmitButtonText,
              })
            )}
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
  feeType: Yup.string().required(feeTypeSelectionRequired),
  monthlyFee: Yup.number()
    .required(monthlyFeeRequired)
    .positive(monthlyFeePositiveNumber)
    .integer(monthlyFeeIntegerNumber)
    .min(1, monthlyFeeMinValue)
    .max(100000, monthlyFeeMaxValue),
  quarterlyFee: Yup.number()
    .required(quarterlyFeeRequired)
    .positive(quarterlyFeePositiveNumber)
    .integer(quarterlyFeeIntegerNumber)
    .min(1, quarterlyFeeMinValue)
    .max(100000, quarterlyFeeMaxValue),
  halfYearlyFee: Yup.number()
    .required(halfYearlyFeeRequired)
    .positive(halfYearlyFeePositiveNumber)
    .integer(halfYearlyFeeIntegerNumber)
    .min(1, halfYearlyFeeMinValue)
    .max(100000, halfYearlyFeeMaxValue),
  yearlyFee: Yup.number()
    .required(yearlyFeeRequired)
    .positive(yearlyFeePositiveNumber)
    .integer(yearlyFeeIntegerNumber)
    .min(1, yearlyFeeMinValue)
    .max(100000, yearlyFeeMaxValue),
});

FeeForm.propTypes = {};

export default FeeForm;
