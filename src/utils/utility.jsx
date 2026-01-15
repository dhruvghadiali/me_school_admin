import moment from "moment";
import { ADMISSION_APPLICATION } from "@MEHelpers/enums";
/**
 * Returns the current academic session based on the current date
 * Academic session is determined by comparing current month with ACADEMIC_SESSION_START_MONTH
 * If current month is after session start month: returns current year and next year
 * Otherwise: returns previous year and current year
 * @param {}
 * @returns {string} - Academic session in format "YYYY-YYYY"
 * @example
 * currentAcademicSession() // returns "2025-2026" if current month > ACADEMIC_SESSION_START_MONTH
 * currentAcademicSession() // returns "2024-2025" if current month <= ACADEMIC_SESSION_START_MONTH
 */
const currentAcademicSession = () => {
  return moment().month() > ADMISSION_APPLICATION.ACADEMIC_SESSION_START_MONTH
    ? `${moment().add(1, "year").format("YYYY")}-${moment().add(2, "year").format("YYYY")}`
    : `${moment().format("YYYY")}-${moment()
        .add(1, "year")
        .format("YYYY")}`;
};

export { currentAcademicSession };
