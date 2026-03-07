import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import _ from "lodash";
import moment from "moment";

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

import AdmissionFormSchema from "./admissionFormSchema";

// ---------------------------------------------------------------------------
// Custom hook — encapsulates all formik logic and derived state
// ---------------------------------------------------------------------------

const useAdmissionForm = () => {
  const dispatch = useDispatch();
  const { admissionFormError, admissionFormLoader, selectedAdmissionApplication } =
    useSelector((state) => state.admissionApplication);

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------

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

  // -------------------------------------------------------------------------
  // Formik
  // -------------------------------------------------------------------------

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

  // -------------------------------------------------------------------------
  // Derived state
  // -------------------------------------------------------------------------

  const currentStatus = selectedAdmissionApplication.applicationStatus;
  const nextStatus = formik.values.status;

  const showAppointmentDateField = !!APPOINTMENT_DATE_REQUIRED[currentStatus]?.has(nextStatus);

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
    (currentStatus === ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFICATION_PENDING ||
      currentStatus === ADMISSION_APPLICATION_STATUS.DOCUMENTS_UNVERIFIED) &&
    nextStatus === ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFIED;

  const hasDocumentsVerified = _.some(
    selectedAdmissionApplication.statusHistory,
    (h) => h.status === _.upperCase(ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFIED),
  );

  const allowedNextStatuses =
    currentStatus === ADMISSION_APPLICATION_STATUS.APPROVED
      ? hasDocumentsVerified
        ? [ADMISSION_APPLICATION_STATUS.FEES_PENDING, ADMISSION_APPLICATION_STATUS.REJECTED]
        : [
            ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFICATION_PENDING,
            ADMISSION_APPLICATION_STATUS.REJECTED,
          ]
      : (ALLOWED_TRANSITIONS[currentStatus] ?? []);

  const statusSelectItems = _.map(allowedNextStatuses, (status) => ({
    label: _.startCase(status),
    value: status,
  }));

  return {
    formik,
    admissionFormError,
    admissionFormLoader,
    currentStatus,
    nextStatus,
    showAppointmentDateField,
    showFeeFields,
    transactionIdRequired,
    paymentMethodItems,
    showDocumentVerification,
    statusSelectItems,
  };
};

export default useAdmissionForm;
