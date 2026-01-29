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
      <div className="mt-4 sm:mt-6 px-3 sm:px-4">
        {/* Filter Header with Toggle */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700 mb-4">
          <div className="flex items-start sm:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Filter className="w-4 h-4 text-primary shrink-0 mt-0.5 sm:mt-0" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0 flex-1">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                  Filter Applications
                </h3>
                {appliedFilterLength() > 0 && (
                  <span className="w-28 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full whitespace-nowrap inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    {appliedFilterLength()} Filter
                    {appliedFilterLength() > 1 ? "s" : ""} Active
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => dispatch(toggleMasterFilter())}
              className="text-xs sm:text-sm font-medium text-primary hover:text-primary/80 px-2 sm:px-3 py-1.5 rounded hover:bg-primary/5 transition-colors whitespace-nowrap shrink-0"
            >
              {showMasterFilter ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Filter Card */}
        {showMasterFilter && <AdmissionScreenTableMasterFilter />}
      </div>

      {/* Table Section */}
      <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] px-2 sm:px-4">
        <MEDataTable rows={admissionApplications} columns={colDefs} />
      </div>
    </>
  );
};

export default AdmissionScreenTableData;
