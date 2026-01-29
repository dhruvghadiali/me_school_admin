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
const currentAcademicSession = (count) => {
  const isAfterStartMonth =
    moment().month() > ADMISSION_APPLICATION.ACADEMIC_SESSION_START_MONTH;

  const sessionStartYear = isAfterStartMonth
    ? moment().add(1, "year").year()
    : moment().year();
  const sessionEndYear = isAfterStartMonth
    ? moment().add(2, "year").year()
    : moment().add(1, "year").year();

  const currentSession = `${sessionStartYear}-${sessionEndYear}`;

  if (count === undefined || count === null) {
    return currentSession;
  }

  const total = Number(count);
  if (!Number.isFinite(total) || total <= 0) {
    return [];
  }

  return Array.from({ length: total }, (_, index) => {
    const startYear = sessionStartYear - index;
    const endYear = sessionEndYear - index;
    return `${startYear}-${endYear}`;
  });
};

export { currentAcademicSession };
