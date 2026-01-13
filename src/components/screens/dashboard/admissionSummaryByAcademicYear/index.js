import { useSelector } from "react-redux";

import MEDataTable from "@/components/common/table/meDataTable";

const DashboardScreenAdmissionSummaryByAcademicYear = () => {
  const { dashboardSummary } = useSelector((state) => state.dashboard);

  const colDefs = [
    {
      headerName: "Academic Year",
      field: "academicYear",
      filter: true,
      sortable: true,
    },
    {
      headerName: "Total Admissions",
      field: "admissionApplication",
      filter: true,
      sortable: true,
    },
    {
      headerName: "Selected Admissions",
      field: "approvedApplication",
      filter: true,
      sortable: true,
    },
    {
      headerName: "Rejected Admissions",
      field: "rejectedApplication",
      filter: true,
      sortable: true,
    },
    {
      headerName: "Under Review Admissions",
      field: "underReviewApplication",
      filter: true,
      sortable: true,
    },
    {
      headerName: "Withdrawn Admissions",
      field: "withdrawnApplication",
      filter: true,
      sortable: true,
    },
  ];
  return (
    <div className="mt-8 mb-16">
      <MEDataTable
        rows={dashboardSummary?.admissionByAcademicYear || []}
        columns={colDefs}
      />
    </div>
  );
};
export default DashboardScreenAdmissionSummaryByAcademicYear;
