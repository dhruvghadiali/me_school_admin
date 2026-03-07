import _ from "lodash";
import * as Yup from "yup";

import {
  ADMISSION_APPLICATION_STATUS,
  ADMISSION_PAYMENT_METHODS,
} from "@MEHelpers/enums/admissionEnum";

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

export default AdmissionFormSchema;
