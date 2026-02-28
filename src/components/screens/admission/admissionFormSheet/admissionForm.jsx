import { useFormik } from "formik";
import { CircleAlertIcon, AlertTriangle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";
import * as Yup from "yup";
import moment from "moment";

import { variants } from "@MEUtils/enums";
import { ADMISSION_APPLICATION_STATUS } from "@MEHelpers/enums/admissionEnum";
import {
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

const AdmissionScreenAdmissionForm = () => {
  const dispatch = useDispatch();
  const {
    admissionFormError,
    admissionFormLoader,
    selectedAdmissionApplication,
  } = useSelector((state) => state.admissionApplication);

  /**
   *    SUBMITTED -> UNDER_REVIEW | REJECTED
   *    UNDER_REVIEW -> DOCUMENTS_VERIFICATION_PENDING | REJECTED
   *    DOCUMENTS_VERIFICATION_PENDING ->  DOCUMENTS_UNVERIFIED | DOCUMENTS_VERIFIED | REJECTED
   *    DOCUMENTS_UNVERIFIED -> DOCUMENTS_VERIFIED | DOCUMENTS_UNVERIFIED | REJECTED
   *    DOCUMENTS_VERIFIED -> APPROVED | REJECTED
   *    APPROVED -> REJECTED | FEES_PENDING
   *    REJECTED -> APPROVED
   *    FEES_PENDING -> FEES_PAID | REJECTED
   *    FEES_PAID -> SELECTED | REJECTED
   *    SELECTED -> REJECTED
   */
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
    [ADMISSION_APPLICATION_STATUS.APPROVED]: [
      ADMISSION_APPLICATION_STATUS.REJECTED,
      ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFICATION_PENDING,
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

  const getAppointmentPayload = (values) => ({
    applicationId: selectedAdmissionApplication.id,
    scheduled_date: moment(values.appointmentDate).format("YYYY-MM-DD"),
    scheduled_time_slot: `${moment(values.appointmentDate).format("h:mm A")} - ${moment(values.appointmentDate).add(1, "hour").format("h:mm A")}`,
    remarks: values.remarks,
  });

  const getStatusAction = (values) => {
    if (
      values.status ===
      ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFICATION_PENDING
    ) {
      return documentVerificationAppointmentBooking(
        getAppointmentPayload(values),
      );
    }

    if (
      values.status === ADMISSION_APPLICATION_STATUS.DOCUMENTS_UNVERIFIED
    ) {
      return rescheduleDocumentVerificationAppointmentBooking(
        getAppointmentPayload(values),
      );
    }

    if (values.status === ADMISSION_APPLICATION_STATUS.FEES_PENDING) {
      return feePaymentAppointmentBooking(
        getAppointmentPayload(values),
      );
    }

    return updateAdmissionApplicationStatus({
      applicationId: selectedAdmissionApplication.id,
      status: values.status,
      remarks: values.remarks,
    });
  };

  const handleFormSubmit = (values) => {
    dispatch(getStatusAction(values)).then((result) => {
      if (result.type.endsWith("/fulfilled") && !result.payload?.error) {
        formik.resetForm();
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      status: "",
      appointmentDate: null,
      remarks: "",
    },
    validationSchema: AdmissionFormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleFormSubmit,
  });

  const showAppointmentDateField = () => {
    if (
      selectedAdmissionApplication.applicationStatus ===
      ADMISSION_APPLICATION_STATUS.UNDER_REVIEW &&
      formik.values.status ===
      ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFICATION_PENDING
    ) {
      return true;
    }else if (
      selectedAdmissionApplication.applicationStatus ===
      ADMISSION_APPLICATION_STATUS.APPROVED &&
      formik.values.status ===
      ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFICATION_PENDING
    ) {
      return true;
    } 
    else if (
      selectedAdmissionApplication.applicationStatus ===
      ADMISSION_APPLICATION_STATUS.DOCUMENTS_VERIFICATION_PENDING &&
      formik.values.status === ADMISSION_APPLICATION_STATUS.DOCUMENTS_UNVERIFIED
    ) {
      return true;
    } else if (
      selectedAdmissionApplication.applicationStatus ===
      ADMISSION_APPLICATION_STATUS.DOCUMENTS_UNVERIFIED &&
      formik.values.status === ADMISSION_APPLICATION_STATUS.DOCUMENTS_UNVERIFIED
    ) {
      return true;
    } else if (
      selectedAdmissionApplication.applicationStatus ===
      ADMISSION_APPLICATION_STATUS.APPROVED &&
      formik.values.status === ADMISSION_APPLICATION_STATUS.FEES_PENDING
    ) {
      return true;
    }

    return false;
  };

  const alertDialogConfig = {
    icon: <AlertTriangle className="text-primary" size={20} />,
    title: "Are you sure?",
    description:
      <span>
        You are about to change the application status to{" "}
        <span className="font-semibold text-primary">
          {formik.values.status
            ? _.startCase(formik.values.status)
            : "N/A"}
        </span>
        . Please confirm to proceed.
      </span>,
    actions: [
      {
        label: "Cancel",
        className: "bg-primary hover:bg-primary/90 text-white",
        onClick: () => { },
      },
      {
        label: "Confirm",
        className: "bg-success hover:bg-success/90 text-white",
        onClick: () => formik.handleSubmit(),
      },
    ],

  }

  return (
    <div className="w-full h-full flex items-start justify-center">
      <div className="w-full mx-auto">
        <div className="bg-secondary/10 rounded-lg p-6 md:p-8 lg:p-10 border border-primary/50 shadow-sm shadow-primary/80">
          {admissionFormError && (
            <div className="bg-danger/90 backdrop-blur-sm mb-8 flex items-center gap-3 rounded-xl p-4 border border-danger/50 shadow-md ">
              <CircleAlertIcon className="text-accent shrink-0 w-5 h-5 animate-pulse" />
              <p className="text-accent text-sm md:text-base font-medium">
                {admissionFormError}
              </p>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-8">
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-primary mb-2">
                Update Application Status
              </h3>
              <div className="h-1 w-20 bg-primary rounded-full"></div>
            </div>

            {/* Fields Container: Column on mobile/tablet, Row on large/laptop screens */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 xl:grid-cols-4">
              <div className="group">
                <MESelect
                  label={"Application Status"}
                  placeholder={"Select Application Status"}
                  items={_.map(
                    ALLOWED_TRANSITIONS[
                    selectedAdmissionApplication.applicationStatus
                    ] || [],
                    (status) => ({
                      label: _.startCase(status),
                      value: status,
                    }),
                  )}
                  selectedValue={formik.values.status}
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

              {showAppointmentDateField() && (
                <>
                  <div className="group">
                    <MEDatePicker
                      label={"Appointment Date & Time"}
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
                </>
              )}

              <MEInput
                id="remarks"
                name="remarks"
                type={"text"}
                message={formik.errors.remarks}
                value={formik.values.remarks}
                labelvariant={
                  formik.errors.remarks ? variants.DANGER : variants.PRIMARY
                }
                inputvariant={
                  formik.errors.remarks ? variants.DANGER : variants.PRIMARY
                }
                messagevariant={variants.DANGER}
                onChange={formik.handleChange}
                onBlur={() => handleFieldBlur("remarks")}
                placeholder={"Enter remarks (optional)"}
                label={"Remarks"}
              />
            </div>

            {/* Action Section */}
            <div className="flex flex-col gap-3 pt-5 border-t border-primary/20 mt-6">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Please review the changes before submitting
              </p>
              <div className="flex items-center">
                <MEActionAlertDialog
                  {...alertDialogConfig}
                >
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
        </div>
      </div>
    </div>
  );
};

const AdmissionFormSchema = Yup.object().shape({
  status: Yup.string().required("Status is required"),
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
