const ADMISSION_APPLICATION = Object.freeze({
  ACADEMIC_SESSION_START_MONTH: 6,
  STUDENT_ACADEMIC_YEARS_RANGE: 2,
});

/**
 * Admission Application Status enumeration
 * Central enum for admission application lifecycle statuses
 */
const ADMISSION_APPLICATION_STATUS = Object.freeze({
  SUBMITTED: "submitted",
  UNDER_REVIEW: "under_review",
  DOCUMENTS_VERIFICATION_PENDING: "documents_verification_pending",
  DOCUMENTS_VERIFIED: "documents_verified",
  DOCUMENTS_UNVERIFIED: "documents_unverified",
  WITHDRAWN: "withdrawn",
  APPROVED: "approved",
  REJECTED: "rejected",
  FEES_PENDING: "fees_pending",
  FEES_PAID: "fees_paid",
  SELECTED: "selected",
});

export { ADMISSION_APPLICATION, ADMISSION_APPLICATION_STATUS };