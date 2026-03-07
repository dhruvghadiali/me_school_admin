import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { CircleAlertIcon, AlertTriangle } from "lucide-react";

import _ from "lodash";
import * as Yup from "yup";
import moment from "moment";

import { variants } from "@MEUtils/enums";
import { Card } from "@MEShadcnComponents/card";
import {
  ADMISSION_APPLICATION_STATUS,
  ADMISSION_PAYMENT_METHODS,
} from "@MEHelpers/enums/admissionEnum";
import {
  ALLOWED_TRANSITIONS,
  APPOINTMENT_DATE_REQUIRED,
} from "@MEScreenComponents/admission/admissionFormSheet/admissionForm/allowedTransactions";
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
import MEActionAlertDialog from "@MECommonComponents/alertDialog/actionAlertDialog";
import DocumentVerificationFieldComponent from "@MEScreenComponents/admission/admissionFormSheet/admissionForm/documentVerificationField";

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
      case ADMISSION_APPLICATION_STATUS.FEES_PAID:
        return updateAdmissionApplicationStatus({
          applicationId: selectedAdmissionApplication.id,
          status: values.status,
          remarks: values.remarks,
          feePaidBy: values.feePaidBy,
          feePaidAmount: values.feePaidAmount,
          paymentMethod: values.paymentMethod,
          transactionId: values.transactionId || null,
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
      feePaidBy: "",
      feePaidAmount: "",
      paymentMethod: "",
      transactionId: "",
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

  const showFeeFields = nextStatus === ADMISSION_APPLICATION_STATUS.FEES_PAID;

  const transactionIdRequired = [
    ADMISSION_PAYMENT_METHODS.UPI,
    ADMISSION_PAYMENT_METHODS.CARD,
    ADMISSION_PAYMENT_METHODS.NETBANKING,
  ].includes(formik.values.paymentMethod);

  const paymentMethodItems = _.map(ADMISSION_PAYMENT_METHODS, (value) => ({
    label: _.upperCase(value),
    value,
  }));

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

              {showFeeFields && (
                <>
                  <div>
                    <MEInput
                      id="feePaidBy"
                      name="feePaidBy"
                      type="text"
                      label="Fee Paid By"
                      placeholder="Enter payer name"
                      value={formik.values.feePaidBy}
                      message={formik.errors.feePaidBy}
                      labelvariant={
                        formik.errors.feePaidBy
                          ? variants.DANGER
                          : variants.PRIMARY
                      }
                      inputvariant={
                        formik.errors.feePaidBy
                          ? variants.DANGER
                          : variants.PRIMARY
                      }
                      messagevariant={variants.DANGER}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div>
                    <MEInput
                      id="feePaidAmount"
                      name="feePaidAmount"
                      type="number"
                      label="Amount Paid"
                      placeholder="Enter amount"
                      value={formik.values.feePaidAmount}
                      message={formik.errors.feePaidAmount}
                      labelvariant={
                        formik.errors.feePaidAmount
                          ? variants.DANGER
                          : variants.PRIMARY
                      }
                      inputvariant={
                        formik.errors.feePaidAmount
                          ? variants.DANGER
                          : variants.PRIMARY
                      }
                      messagevariant={variants.DANGER}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div>
                    <MESelect
                      label="Payment Method"
                      placeholder="Select Payment Method"
                      items={paymentMethodItems}
                      selectedValue={formik.values.paymentMethod}
                      selectVariant={
                        formik.errors.paymentMethod
                          ? variants.DANGER
                          : variants.DARK
                      }
                      selectedVariant={variants.DARK}
                      labelvariant={variants.DARK}
                      messagevariant={variants.DANGER}
                      message={formik.errors.paymentMethod}
                      clearable={true}
                      onValueChange={(value) => {
                        formik.setFieldValue("paymentMethod", value);
                        formik.setFieldValue("transactionId", "");
                      }}
                    />
                  </div>
                  {transactionIdRequired && (
                    <div>
                      <MEInput
                        id="transactionId"
                        name="transactionId"
                        type="text"
                        label="Transaction ID"
                        placeholder="Enter transaction ID"
                        value={formik.values.transactionId}
                        message={formik.errors.transactionId}
                        labelvariant={
                          formik.errors.transactionId
                            ? variants.DANGER
                            : variants.PRIMARY
                        }
                        inputvariant={
                          formik.errors.transactionId
                            ? variants.DANGER
                            : variants.PRIMARY
                        }
                        messagevariant={variants.DANGER}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  )}
                </>
              )}

              {showDocumentVerification && (
                <div className="col-span-2">
                  <DocumentVerificationFieldComponent
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
  feePaidBy: Yup.string().when("status", {
    is: ADMISSION_APPLICATION_STATUS.FEES_PAID,
    then: (schema) =>
      schema
        .required("Please specify who will pay the fees")
        .min(3, "Must be at least 3 characters")
        .max(50, "Cannot exceed 50 characters"),
    otherwise: (schema) => schema.nullable(),
  }),
  feePaidAmount: Yup.number().when("status", {
    is: ADMISSION_APPLICATION_STATUS.FEES_PAID,
    then: (schema) =>
      schema
        .required("Please enter the amount paid")
        .typeError("Amount must be a number")
        .positive("Amount must be greater than zero")
        .max(1000000, "Amount seems too high"),
    otherwise: (schema) => schema.nullable(),
  }),
  paymentMethod: Yup.string().when("status", {
    is: ADMISSION_APPLICATION_STATUS.FEES_PAID,
    then: (schema) => schema.required("Please specify the payment method"),
    otherwise: (schema) => schema.nullable(),
  }),
  transactionId: Yup.string().when(["status", "paymentMethod"], {
    is: (status, pm) =>
      status === ADMISSION_APPLICATION_STATUS.FEES_PAID &&
      [
        ADMISSION_PAYMENT_METHODS.UPI,
        ADMISSION_PAYMENT_METHODS.CARD,
        ADMISSION_PAYMENT_METHODS.NETBANKING,
      ].includes(pm),
    then: (schema) =>
      schema
        .required("Please enter the transaction ID")
        .min(5, "Must be at least 5 characters")
        .max(100, "Cannot exceed 100 characters"),
    otherwise: (schema) => schema.nullable(),
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
