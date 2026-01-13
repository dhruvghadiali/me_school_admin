import MEDataTable from "@/components/common/table/meDataTable";

const DashboardScreenAdmissionSummaryByAcademicYear = () => {
  const colDefs = [
    {
      headerName: "Academic Year",
      field: "academicClass",
      filter: true,
      sortable: true,
    },
    {
      headerName: "Total Admissions",
      field: "totalAdmissions",
      filter: true,
      sortable: true,
    },
    {
      headerName: "Selected Admissions",
      field: "selectedAdmissions",
      filter: true,
      sortable: true,
    },
    {
      headerName: "Rejected Admissions",
      field: "rejectedAdmissions",
      filter: true,
      sortable: true,
    },
    {
      headerName: "Under Review Admissions",
      field: "underReviewAdmissions",
      filter: true,
      sortable: true,
    },
    {
      headerName: "Withdrawn Admissions",
      field: "withdrawnAdmissions",
      filter: true,
      sortable: true,
    },
  ];

  const academicYears = [
    {
      id: 1,
      academicClass: "2026-2027",
      totalAdmissions: 120,
      selectedAdmissions: 80,
      rejectedAdmissions: 10,
      underReviewAdmissions: 5,
      withdrawnAdmissions: 2,
    },
    {
      id: 2,
      academicClass: "2025-2026",
      totalAdmissions: 110,
      selectedAdmissions: 75,
      rejectedAdmissions: 15,
      underReviewAdmissions: 3,
      withdrawnAdmissions: 1,
    },
    {
      id: 3,
      academicClass: "2024-2025",
      totalAdmissions: 100,
      selectedAdmissions: 70,
      rejectedAdmissions: 12,
      underReviewAdmissions: 4,
      withdrawnAdmissions: 2,
    },
    {
      id: 4,
      academicClass: "2023-2024",
      totalAdmissions: 90,
      selectedAdmissions: 65,
      rejectedAdmissions: 8,
      underReviewAdmissions: 2,
      withdrawnAdmissions: 1,
    },
    {
      id: 5,
      academicClass: "2022-2023",
      totalAdmissions: 80,
      selectedAdmissions: 60,
      rejectedAdmissions: 5,
      underReviewAdmissions: 1,
      withdrawnAdmissions: 0,
    },
    {
      id: 6,
      academicClass: "2021-2022",
      totalAdmissions: 70,
      selectedAdmissions: 55,
      rejectedAdmissions: 7,
      underReviewAdmissions: 3,
      withdrawnAdmissions: 1,
    },
  ];
  return (
    <div className="mt-8 mb-16">
      <MEDataTable rows={academicYears} columns={colDefs} />
    </div>
  );
};
export default DashboardScreenAdmissionSummaryByAcademicYear;
