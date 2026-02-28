import _ from "lodash";

const dashboardSummaryAPIResponse = (dashboardSummary) => {
  return {
    statsData: formateStatsData(dashboardSummary),
    admissionByAcademicClass: formateAdmissionByAcademicClass(
      _.get(dashboardSummary, "admission_by_academic_class", [])
    ),
    admissionByMonth: formateAdmissionByMonth(
      _.get(dashboardSummary, "admission_by_month", [])
    ),
    admissionByAcademicYear: formateAdmissionByAcademicYear(
      _.get(dashboardSummary, "admission_by_academic_year", [])
    ),
  };
};

const formateStatsData = (data) => {
  return [
    {
      id: 1,
      label: "Total Application Submitted",
      value: _.get(data, "admission_application", "N/A"),
      icon: "FileCheck",
    },
    {
      id: 2,
      label: "Total Selected Application",
      value: _.get(data, "selected_application", "N/A"),
      icon: "CheckCircle2",
    },
    {
      id: 3,
      label: "Total Rejected Application",
      value: _.get(data, "rejected_application", "N/A"),
      icon: "XCircle",
    },
    {
      id: 4,
      label: "Total In Progress Application",
      value: _.get(data, "under_review_application", "N/A"),
      icon: "Clock",
    },
    {
      id: 5,
      label: "Total Withdrawn Application",
      value: _.get(data, "withdraw_application", "N/A"),
      icon: "Trash2",
    },
  ];
};

const formateAdmissionByAcademicClass = (data) => {
  return _.map(data, (item) => ({
    academicClass: _.upperFirst(_.get(item, "academic_class", "N/A")),
    admissionApplication: _.get(item, "admission_application", 0),
    approvedApplication: _.get(item, "approved_application", 2),
    rejectedApplication: _.get(item, "rejected_application", 0),
    withdrawnApplication: _.get(item, "withdrawn_application", 0),
    underReviewApplication: _.get(item, "under_review_application", 0),
  }));
};

const formateAdmissionByMonth = (data) => {
  return _.map(data, (item) => ({
    month: _.get(item, "month", "N/A"),
    admissionApplication: _.get(item, "admission_application", 0),
    approvedApplication: _.get(item, "approved_application", 0),
    rejectedApplication: _.get(item, "rejected_application", 0),
    withdrawnApplication: _.get(item, "withdrawn_application", 0),
    underReviewApplication: _.get(item, "under_review_application", 0),
  }));
};

const formateAdmissionByAcademicYear = (data) => {
  return _.map(data, (item) => ({
    academicYear: _.get(item, "academic_year", "N/A"),
    admissionApplication: _.get(item, "admission_application", 0),
    approvedApplication: _.get(item, "approved_application", 0),
    rejectedApplication: _.get(item, "rejected_application", 0),
    withdrawnApplication: _.get(item, "withdrawn_application", 0),
    underReviewApplication: _.get(item, "under_review_application", 0),
  }));
};

export { dashboardSummaryAPIResponse };
