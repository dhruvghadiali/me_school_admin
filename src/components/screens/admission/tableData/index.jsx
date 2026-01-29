import { Eye, Filter } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";

import { Button } from "@MEShadcnComponents/button";
import { toggleMasterFilter } from "@MERedux/admission/admissionSlice";

import MEDataTable from "@/components/common/table/meDataTable";
import AdmissionScreenTableMasterFilter from "@MEScreenComponents/admission/tableData/tableMasterFilter";

const AdmissionScreenTableData = () => {
  const dispatch = useDispatch();
  const {
    admissionApplications,
    showMasterFilter,
    selectedAcademicYear,
    selectedEductionBoard,
    selectedAcademicClass,
    selectedApplicationStatus,
  } = useSelector((state) => state.admissionApplication);

  const appliedFilterLength = () => {
    let count = 0;
    if (selectedAcademicYear) count += 1;
    if (selectedEductionBoard) count += 1;
    if (selectedAcademicClass) count += 1;
    if (selectedApplicationStatus) count += 1;
    return count;
  };
  
  const colDefs = [
    {
      headerName: "Actions",
      field: "actions",
      width: 100,
      cellRenderer: (params) => (
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="link"
            className="text-primary cursor-pointer"
            onClick={() => {}}
          >
            <Eye />
          </Button>
        </div>
      ),
    },
    {
      headerName: "Student Name",
      field: "applicantName",
      width: 350,
      filter: true,
      sortable: true,
    },
    {
      headerName: "Application Number",
      field: "applicationNumber",
      width: 250,
      filter: true,
      sortable: true,
    },
    {
      headerName: "Eduction Board",
      field: "educationBoard",
      width: 200,
      filter: true,
      sortable: true,
    },
    {
      headerName: "Academic Class",
      field: "academicClass",
      width: 200,
      filter: true,
      sortable: true,
    },
    {
      headerName: "Academic Year",
      field: "academicSession",
      width: 150,
      filter: true,
      sortable: true,
    },
    {
      headerName: "Status",
      field: "status",
      width: 200,
      filter: true,
      sortable: true,
    },
    {
      headerName: "Applied Date",
      field: "createdAt",
      width: 250,
      filterType: "dateColumnFilter",
      filter: true,
      sortable: true,
    },
  ];

  return (
    <>
      {/* Filter Section */}
      <div className="mt-6 px-2 sm:px-4">
        {/* Filter Header with Toggle */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-primary" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filter Applications
            </h3>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
              {appliedFilterLength()} Applied
            </span>
          </div>
          <button
            onClick={() => dispatch(toggleMasterFilter())}
            className="text-sm font-medium text-primary hover:underline px-3 py-1.5 rounded hover:bg-primary/5 transition-colors"
          >
            {showMasterFilter ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Filter Card */}
        {showMasterFilter && <AdmissionScreenTableMasterFilter />}
      </div>

      {/* Table Section */}
      <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh]">
        <MEDataTable rows={admissionApplications} columns={colDefs} />
      </div>
    </>
  );
};

export default AdmissionScreenTableData;
