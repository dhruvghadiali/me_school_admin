import { useFormik } from "formik";
import {
  CircleAlertIcon,
  AlertTriangle,
  FileSearch2Icon,
  CheckCircle2Icon,
  ChevronRightIcon,
  FileClockIcon,
} from "lucide-react";
import { Label } from "@MEShadcnComponents/label";
import { useSelector, useDispatch } from "react-redux";
import {Card} from "@MEShadcnComponents/card";

import _ from "lodash";
import * as Yup from "yup";
import moment from "moment";

import { variants } from "@MEUtils/enums";
import { ME_CHECKBOX_COMPONENT_ENUM } from "@MEHelpers/enums";
import { ADMISSION_APPLICATION_STATUS } from "@MEHelpers/enums/admissionEnum";
import {
  updatedVerifiedDocument,
  feePaymentAppointmentBooking,
  updateAdmissionApplicationStatus,
  documentVerificationAppointmentBooking,
  rescheduleDocumentVerificationAppointmentBooking,
} from "@MERedux/admission/admissionAction";

import MEInput from "@MECommonComponents/form/input/meInput";
import MESelect from "@MECommonComponents/form/select/meSelect";
import MEButton from "@MECommonComponents/form/button/meButton";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";
import MEDatePicker from "@MECommonComponents/form/input/meDatePicker";
import MECheckbox from "@MECommonComponents/form/checkbox";
import MEActionAlertDialog from "@MECommonComponents/alertDialog/actionAlertDialog";

// ---------------------------------------------------------------------------
// Static constants (no re-creation on every render)
// ---------------------------------------------------------------------------

const ALLOWED_TRANSITIONS = {
  [ADMISSION_APPLICATION_STATUS.SUBMITTED]: [
    ADMISSION_APPLICATION_STATUS.UNDER_REVIEW,
    ADMISSION_APPLICATION_STATUS.REJECTED,
  ],
  [ADMISSION_APPLICATION_STATUS.UNDER_REVIEW]: [
    ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFICATION_PENDING,
    ADMISSION_APPLICATION_STATUS.REJECTED,
  ],
  [ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFICATION_PENDING]: [
    ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFIED,
    ADMISSION_APPLICATION_STATUS.DOCUMENTS_UNVERIFIED,
    ADMISSION_APPLICATION_STATUS.REJECTED,
  ],
  [ADMISSION_APPLICATION_STATUS.DOCUMENTS_UNVERIFIED]: [
    ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFIED,
    ADMISSION_APPLICATION_STATUS.DOCUMENTS_UNVERIFIED,
    ADMISSION_APPLICATION_STATUS.REJECTED,
  ],
  [ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFIED]: [
    ADMISSION_APPLICATION_STATUS.APPROVED,
    ADMISSION_APPLICATION_STATUS.REJECTED,
  ],
  [ADMISSION_APPLICATION_STATUS.REJECTED]: [
    ADMISSION_APPLICATION_STATUS.APPROVED,
  ],
  [ADMISSION_APPLICATION_STATUS.FEES_PENDING]: [
    ADMISSION_APPLICATION_STATUS.FEES_PAID,
    ADMISSION_APPLICATION_STATUS.REJECTED,
  ],
  [ADMISSION_APPLICATION_STATUS.FEES_PAID]: [
    ADMISSION_APPLICATION_STATUS.SELECTED,
    ADMISSION_APPLICATION_STATUS.REJECTED,
  ],
  [ADMISSION_APPLICATION_STATUS.SELECTED]: [
    ADMISSION_APPLICATION_STATUS.REJECTED,
  ],
};

/**
 * Status transitions that require an appointment date field.
 * Key: currentStatus | Value: set of next statuses that need a date picker.
 */
const APPOINTMENT_DATE_REQUIRED = {
  [ADMISSION_APPLICATION_STATUS.UNDER_REVIEW]: new Set([
    ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFICATION_PENDING,
  ]),
  [ADMISSION_APPLICATION_STATUS.APPROVED]: new Set([
    ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFICATION_PENDING,
    ADMISSION_APPLICATION_STATUS.FEES_PENDING,
  ]),
  [ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFICATION_PENDING]: new Set([
    ADMISSION_APPLICATION_STATUS.DOCUMENTS_UNVERIFIED,
  ]),
  [ADMISSION_APPLICATION_STATUS.DOCUMENTS_UNVERIFIED]: new Set([
    ADMISSION_APPLICATION_STATUS.DOCUMENTS_UNVERIFIED,
  ]),
};

// ---------------------------------------------------------------------------
// Sub-component: Document Verification Field
// ---------------------------------------------------------------------------

const DocumentVerificationField = ({
  documentList,
  onDocumentListChange,
  disabled,
  error,
}) => {
  const verifiedCount = _.size(_.filter(documentList, (doc) => doc.isSelected));
  const totalCount = _.size(documentList);
  const allVerified = verifiedCount === totalCount && totalCount > 0;

  const handleCheckboxChange = (updated) => {
    onDocumentListChange(
      _.map(documentList, (doc) => {
        const found = _.find(updated, (u) => u.label === doc.label);
        return found ? { ...doc, isSelected: found.isSelected } : doc;
      }),
    );
  };

  const requiredDocs = _.filter(documentList, (doc) => doc.isRequired);
  const optionalDocs = _.filter(documentList, (doc) => !doc.isRequired);

  const dialogDescription =
    totalCount > 0 ? (
      <div className="space-y-4">
        {_.size(requiredDocs) > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-danger uppercase tracking-wide">
              Required Documents ({_.size(requiredDocs)})
            </p>
            <MECheckbox
              label=""
              disabled={false}
              direction={ME_CHECKBOX_COMPONENT_ENUM.CHECKBOX_LIST_DIRECTION.ROW}
              checkboxDirection={
                ME_CHECKBOX_COMPONENT_ENUM.CHECKBOX_DIRECTION.RIGHT
              }
              labelVariant={ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY}
              checkboxVariant={ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY}
              messageVariant={ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY}
              checkboxList={requiredDocs}
              leadingIcon={<FileClockIcon className="text-primary" size={15} />}
              onChange={handleCheckboxChange}
            />
          </div>
        )}
        {_.size(optionalDocs) > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Optional Documents ({_.size(optionalDocs)})
            </p>
            <MECheckbox
              label=""
              disabled={false}
              direction={ME_CHECKBOX_COMPONENT_ENUM.CHECKBOX_LIST_DIRECTION.ROW}
              checkboxDirection={
                ME_CHECKBOX_COMPONENT_ENUM.CHECKBOX_DIRECTION.RIGHT
              }
              labelVariant={ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY}
              checkboxVariant={ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY}
              messageVariant={ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY}
              checkboxList={optionalDocs}
              leadingIcon={<FileClockIcon className="text-primary" size={15} />}
              onChange={handleCheckboxChange}
            />
          </div>
        )}
      </div>
    ) : (
      <span>No documents uploaded for this application.</span>
    );

  return (
    <div className="space-y-2">
      <Label className="text-primary">Document Verification</Label>

      <MEActionAlertDialog
        icon={<FileSearch2Icon className="text-primary" size={20} />}
        title="Document Verification"
        description={dialogDescription}
        actions={[
          {
            label: "Cancel",
            className: "bg-primary hover:bg-primary/90 text-white",
            onClick: () => {},
          },
          {
            label: "Confirm Verification",
            className: "bg-success hover:bg-success/90 text-white",
            onClick: () => {},
          },
        ]}
      >
        <button
          type="button"
          disabled={disabled}
          className="flex w-full items-center justify-between rounded-md border border-primary/80 bg-transparent px-3 py-1.5 text-sm shadow-sm transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/20 disabled:opacity-50"
        >
          <span className="flex items-center gap-2 text-primary/80">
            <FileSearch2Icon size={15} className="text-primary shrink-0" />
            {verifiedCount > 0
              ? `${verifiedCount} of ${totalCount} documents verified`
              : "Click to verify documents"}
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            {allVerified ? (
              <CheckCircle2Icon size={15} className="text-success" />
            ) : (
              <ChevronRightIcon size={15} className="text-primary/60" />
            )}
          </span>
        </button>
      </MEActionAlertDialog>

      {error && (
        <p className="text-xs text-danger" role="alert" aria-live="polite">
          {error}
        </p>
      )}

      <p className="mt-2 mb-5 text-xs text-primary flex flex-wrap gap-x-3 gap-y-0.5">
        <span>
          <span className="font-semibold">{totalCount}</span> total
        </span>
        <span className="text-danger">
          <span className="font-semibold">{_.size(requiredDocs)}</span> required
        </span>
        <span className="text-muted-foreground">
          <span className="font-semibold">{_.size(optionalDocs)}</span> optional
        </span>
        <span className="text-success">
          <span className="font-semibold">{verifiedCount}</span> verified
        </span>
      </p>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const AdmissionScreenAdmissionForm = () => {
  const dispatch = useDispatch();
  const {
    admissionFormError,
    admissionFormLoader,
    selectedAdmissionApplication,
  } = useSelector((state) => state.admissionApplication);

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  const buildAppointmentPayload = (values) => ({
    applicationId: selectedAdmissionApplication.id,
    scheduledDate: moment(values.appointmentDate).format("YYYY-MM-DD"),
    scheduledTimeSlot: `${moment(values.appointmentDate).format("h:mm A")} - ${moment(values.appointmentDate).add(1, "hour").format("h:mm A")}`,
    remarks: values.remarks,
  });

  const getStatusAction = (values) => {
    const payload = buildAppointmentPayload(values);

    switch (values.status) {
      case ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFICATION_PENDING:
        return documentVerificationAppointmentBooking(payload);
      case ADMISSION_APPLICATION_STATUS.DOCUMENTS_UNVERIFIED:
        return rescheduleDocumentVerificationAppointmentBooking(payload);
      case ADMISSION_APPLICATION_STATUS.FEES_PENDING:
        return feePaymentAppointmentBooking(payload);
      case ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFIED:
        return updatedVerifiedDocument({
          applicationId: selectedAdmissionApplication.id,
          documentList: values.documentList,
        });
      default:
        return updateAdmissionApplicationStatus({
          applicationId: selectedAdmissionApplication.id,
          status: values.status,
          remarks: values.remarks,
        });
    }
  };

  // ---------------------------------------------------------------------------
  // Formik
  // ---------------------------------------------------------------------------

  const formik = useFormik({
    initialValues: {
      status: "",
      appointmentDate: null,
      remarks: "",
      documentList: selectedAdmissionApplication.documentVerificationList ?? [],
    },
    validationSchema: AdmissionFormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      dispatch(getStatusAction(values)).then((result) => {
        if (result.type.endsWith("/fulfilled") && !result.payload?.error) {
          formik.resetForm();
        }
      });
    },
  });

  // ---------------------------------------------------------------------------
  // Derived state
  // ---------------------------------------------------------------------------

  const currentStatus = selectedAdmissionApplication.applicationStatus;
  const nextStatus = formik.values.status;

  const showAppointmentDateField =
    !!APPOINTMENT_DATE_REQUIRED[currentStatus]?.has(nextStatus);

  const showDocumentVerification =
    (currentStatus ===
      ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFICATION_PENDING ||
      currentStatus === ADMISSION_APPLICATION_STATUS.DOCUMENTS_UNVERIFIED) &&
    nextStatus === ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFIED;

  // For APPROVED, next transitions depend on whether docs were ever verified.
  // statusHistory items use _.upperCase() format (e.g. "DOCUMENTS VERIFIED").
  const hasDocumentsVerified = _.some(
    selectedAdmissionApplication.statusHistory,
    (h) =>
      h.status === _.upperCase(ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFIED),
  );

  const allowedNextStatuses =
    currentStatus === ADMISSION_APPLICATION_STATUS.APPROVED
      ? hasDocumentsVerified
        ? [
            ADMISSION_APPLICATION_STATUS.FEES_PENDING,
            ADMISSION_APPLICATION_STATUS.REJECTED,
          ]
        : [
            ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFICATION_PENDING,
            ADMISSION_APPLICATION_STATUS.REJECTED,
          ]
      : (ALLOWED_TRANSITIONS[currentStatus] ?? []);

  const statusSelectItems = _.map(allowedNextStatuses, (status) => ({
    label: _.startCase(status),
    value: status,
  }));

  const changeStatusAlertConfig = {
    icon: <AlertTriangle className="text-primary" size={20} />,
    title: "Are you sure?",
    description: (
      <span>
        You are about to change the application status to{" "}
        <span className="font-semibold text-primary">
          {nextStatus ? _.startCase(nextStatus) : "N/A"}
        </span>
        . Please confirm to proceed.
      </span>
    ),
    actions: [
      {
        label: "Cancel",
        className: "bg-primary hover:bg-primary/90 text-white",
        onClick: () => {},
      },
      {
        label: "Confirm",
        className: "bg-success hover:bg-success/90 text-white",
        onClick: () => formik.handleSubmit(),
      },
    ],
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="w-full h-full flex items-start justify-center">
      <div className="w-full mx-auto">
        <Card className="bg-secondary/50 shadow-lg shadow-primary/50 py-6 px-10">
          {/* Error Banner */}
          {admissionFormError && (
            <div className="bg-danger/90 backdrop-blur-sm mb-5 flex items-center gap-3 rounded-xl p-3 border border-danger/90 shadow-md">
              <CircleAlertIcon className="text-accent shrink-0 w-5 h-5 animate-pulse" />
              <p className="text-accent text-sm md:text-base font-medium">
                {admissionFormError}
              </p>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="">
            {/* Heading */}
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-primary mb-2">
                Update Application Status
              </h3>
              <div className="h-1 w-20 bg-primary rounded-full" />
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 xl:grid-cols-5">
              <div>
                <MESelect
                  label="Application Status"
                  placeholder="Select Application Status"
                  items={statusSelectItems}
                  selectedValue={nextStatus}
                  selectVariant={
                    formik.errors.status ? variants.DANGER : variants.DARK
                  }
                  selectedVariant={variants.DARK}
                  labelvariant={variants.DARK}
                  messagevariant={variants.DANGER}
                  message={formik.errors.status}
                  clearable={true}
                  onValueChange={(value) =>
                    formik.setFieldValue("status", value)
                  }
                />
              </div>

              {showAppointmentDateField && (
                <div>
                  <MEDatePicker
                    label="Appointment Date & Time"
                    popoverTriggerClassName="border-primary"
                    messagevariant={variants.DANGER}
                    message={formik.errors.appointmentDate}
                    selectedDate={formik.values.appointmentDate}
                    showTime={true}
                    enableTime={true}
                    dateFormat="MMM dd, yyyy h:mm aa"
                    onSelect={(date) =>
                      formik.setFieldValue("appointmentDate", date)
                    }
                  />
                </div>
              )}

              <MEInput
                id="remarks"
                name="remarks"
                type="text"
                label="Remarks"
                placeholder="Enter remarks (optional)"
                value={formik.values.remarks}
                message={formik.errors.remarks}
                labelvariant={
                  formik.errors.remarks ? variants.DANGER : variants.PRIMARY
                }
                inputvariant={
                  formik.errors.remarks ? variants.DANGER : variants.PRIMARY
                }
                messagevariant={variants.DANGER}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {showDocumentVerification && (
                <div className="col-span-2">
                  <DocumentVerificationField
                    documentList={formik.values.documentList}
                    onDocumentListChange={(updated) => {
                      formik.setFieldValue("documentList", updated);
                      formik.setFieldError("documentList", undefined);
                    }}
                    disabled={admissionFormLoader}
                    error={formik.errors.documentList}
                  />
                </div>
              )}
            </div>

            {/* Action */}
            <div className="flex flex-col gap-3 pt-5 border-t border-primary/20">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Please review the changes before submitting
              </p>
              <div className="flex items-center">
                <MEActionAlertDialog {...changeStatusAlertConfig}>
                  <MEButton
                    buttonVariant={variants.SUCCESS}
                    type="button"
                    disabled={admissionFormLoader}
                    buttonClassName="w-full sm:w-auto px-6 sm:px-8"
                  >
                    {admissionFormLoader && <MELoaderIcon />} Change Status
                  </MEButton>
                </MEActionAlertDialog>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

const AdmissionFormSchema = Yup.object().shape({
  status: Yup.string().required("Status is required"),
  documentList: Yup.array().when("status", {
    is: ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFIED,
    then: (schema) =>
      schema.test("required-docs-verified", "", function (list) {
        const unverified = _.filter(
          list,
          (doc) => doc.isRequired && !doc.isSelected,
        );
        if (_.size(unverified) > 0) {
          return this.createError({
            message: `${_.size(unverified)} required document(s) must be verified before proceeding.`,
          });
        }
        return true;
      }),
    otherwise: (schema) => schema,
  }),
  appointmentDate: Yup.date().when("status", {
    is: (status) =>
      status === ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFICATION_PENDING ||
      status === ADMISSION_APPLICATION_STATUS.FEES_PENDING,
    then: (schema) =>
      schema
        .required("Appointment date and time selection is required")
        .typeError("Please select a valid date and time")
        .nullable(),
    otherwise: (schema) => schema.nullable(),
  }),
  remarks: Yup.string()
    .max(200, "Remarks cannot exceed 200 characters")
    .min(10, "Remarks must be at least 10 characters")
    .nullable(),
});

export default AdmissionScreenAdmissionForm;
