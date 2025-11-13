import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { CircleAlertIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import { variants } from "@MEUtils/enums";
import { Label } from "@MEShadcnComponents/label";
import { Checkbox } from "@MEShadcnComponents/checkbox";
import {
  addAdmissionDocumentAPIPayload,
  updateAdmissionDocumentAPIPayload,
} from "@MEUtils/apiPayload";
import {
  addAdmissionDocument,
  updateAdmissionDocument,
} from "@MERedux/admissionDocument/admissionDocumentAction";

import {
  notesLabel,
  isRequiredLabel,
  isRequiredDescription,
  admissionDocumentSelectionLabel,
  admissionDocumentSelectionPlaceholder,
  academicClassSelectionLabel,
  academicClassSelectionPlaceholder,
  admissionDocumentSubmitButtonText,
} from "@MELocalization/en";
import {
  academicClassSelectionRequired,
  admissionDocumentNotesMinLength,
  admissionDocumentNotesMaxLength,
  admissionDocumentSelectionRequired,
  admissionDocumentVerificationStatusRequired,
} from "@MEUtils/validationMessage";

import _ from "lodash";
import * as Yup from "yup";

import MEInput from "@MECommonComponents/input/meInput";
import MEButton from "@MECommonComponents/button/meButton";
import MESelect from "@MECommonComponents/select/meSelect";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";

const AdmissionDocumentForm = () => {
  const {
    admissionDocuments,
    selectedEductionBoard,
    schoolAdmissionFormData,
    schoolAdmissionDocuments,
    admissionDocumentFormError,
    admissionDocumentFormLoader,
    eductionBoardsWithAcademicClasses,
  } = useSelector((state) => state.admissionDocument);
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      academicClass: schoolAdmissionFormData.academicClass,
      admissionDocument: schoolAdmissionFormData.admissionDocumentValue,
      isRequired: schoolAdmissionFormData.isRequired,
      notes: schoolAdmissionFormData.notes,
    },
    validationSchema: AdmissionDocumentSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      schoolAdmissionFormData.id
        ? dispatch(
            updateAdmissionDocument(
              updateAdmissionDocumentAPIPayload(
                values,
                schoolAdmissionFormData.id
              )
            )
          )
        : dispatch(
            addAdmissionDocument(addAdmissionDocumentAPIPayload(values))
          );
    },
  });

  return (
    <>
      <div className="py-3" />
      {admissionDocumentFormError && (
        <div className="bg-danger mb-2 flex items-center  rounded-md">
          <CircleAlertIcon className="text-accent ml-2" />
          <p className="text-accent p-2 text-left">
            {admissionDocumentFormError}
          </p>
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
          selectedVariant={variants.DARK}
          message={formik.errors.academicClass}
          selectedValue={formik.values.academicClass}
          onValueChange={(value) => {}}
        />

        <MESelect
          id="admissionDocument"
          label={
            i18n.exists("admissionDocumentSelectionLabel")
              ? _.upperFirst(t("admissionDocumentSelectionLabel"))
              : _.upperFirst(admissionDocumentSelectionLabel)
          }
          placeholder={
            i18n.exists("admissionDocumentSelectionPlaceholder")
              ? _.upperFirst(t("admissionDocumentSelectionPlaceholder"))
              : _.upperFirst(admissionDocumentSelectionPlaceholder)
          }
          items={[
            ..._.filter(
              admissionDocuments,
              (admissionDocument) =>
                !_.includes(
                  _.map(schoolAdmissionDocuments, (schoolAdmissionDocument) =>
                    _.toLower(schoolAdmissionDocument.admissionDocument)
                  ),
                  _.toLower(admissionDocument.label)
                )
            ),
            schoolAdmissionFormData.id && {
              label: schoolAdmissionFormData.admissionDocumentLabel,
              value: schoolAdmissionFormData.admissionDocumentValue,
            },
          ]}
          disabled={schoolAdmissionFormData.id ? true : false}
          labelvariant={variants.DARK}
          selectVariant={variants.DARK}
          messagevariant={variants.DANGER}
          selectedVariant={variants.DARK}
          message={formik.errors.admissionDocument}
          selectedValue={formik.values.admissionDocument}
          onValueChange={(value) =>
            formik.setFieldValue("admissionDocument", value)
          }
        />

        <MEInput
          id="notes"
          type={"text"}
          label={
            i18n.exists("notesLabel")
              ? _.upperFirst(t("notesLabel"))
              : _.upperFirst(notesLabel)
          }
          message={formik.errors.notes}
          value={formik.values.notes}
          labelvariant={variants.DARK}
          inputvariant={variants.DARK}
          messagevariant={variants.DANGER}
          onChange={formik.handleChange}
        />

        <div className="flex items-start gap-2 my-5">
          <Checkbox
            id={"isRequired"}
            className={`border-dark focus:ring-dark ${
              formik.values.isRequired
                ? "!bg-dark !text-white"
                : "bg-white text-dark "
            } `}
            checked={formik.values.isRequired}
            onCheckedChange={(checked) =>
              formik.setFieldValue("isRequired", checked)
            }
          />
          <div className="grid grow gap-2">
            <Label htmlFor={"isRequired"}>
              {i18n.exists("isRequiredLabel")
                ? _.upperFirst(t("isRequiredLabel"))
                : _.upperFirst(isRequiredLabel)}{" "}
              <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                {`(${formik.values.isRequired ? "Required" : "Optional"})`}
              </span>
            </Label>
            <p
              id={`isRequired-description`}
              className="text-muted-foreground text-xs"
            >
              {i18n.exists("isRequiredDescription")
                ? _.upperFirst(t("isRequiredDescription"))
                : _.upperFirst(isRequiredDescription)}
            </p>
          </div>
        </div>

        <div className="py-2">
          <MEButton type="submit" buttonVariant={variants.SUCCESS}>
            {i18n.exists("admissionDocumentSubmitButtonText")
              ? _.upperCase(t("admissionDocumentSubmitButtonText"))
              : _.upperCase(admissionDocumentSubmitButtonText)}
            {admissionDocumentFormLoader && <MELoaderIcon />}
          </MEButton>
        </div>
      </form>
    </>
  );
};

const AdmissionDocumentSchema = Yup.object().shape({
  academicClass: Yup.string().required(academicClassSelectionRequired),
  admissionDocument: Yup.string().required(admissionDocumentSelectionRequired),
  isRequired: Yup.bool().required(admissionDocumentVerificationStatusRequired),
  notes: Yup.string()
    .trim()
    .min(10, admissionDocumentNotesMinLength)
    .max(500, admissionDocumentNotesMaxLength),
});

AdmissionDocumentForm.propTypes = {};

export default AdmissionDocumentForm;
