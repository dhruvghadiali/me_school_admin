import { Eye, Filter, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";

import { variants } from "@MEUtils/enums";
import { Button } from "@MEShadcnComponents/button";
import {
  setEductionBoard,
  setSelectedAcademicClass,
} from "@MERedux/admission/admissionSlice";
import { getAdmissionApplications } from "@MERedux/admission/admissionAction";

import MEDataTable from "@/components/common/table/meDataTable";
import MESelect from "@MECommonComponents/form/select/meSelect";
import MEButton from "@MECommonComponents/form/button/meButton";

const AdmissionScreenTableData = () => {
  const dispatch = useDispatch();
  const {
    admissionApplications,
    selectedEductionBoard,
    selectedAcademicClass,
    eductionBoardsWithAcademicClasses,
  } = useSelector((state) => state.admissionApplication);

  const [filters, setFilters] = useState({
    academicYear: "",
    academicClass: "",
    applicationStatus: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplyFilters = () => {
    console.log("Applying filters:", filters);
    // Dispatch action to apply filters
    let query = "";
    if (filters.academicYear) {
      query += `academic_year=${filters.academicYear}`;
    }
    if (selectedAcademicClass) {
      query += query
        ? `&academic_class=${selectedAcademicClass}`
        : `academic_class=${selectedAcademicClass}`;
    }
    if (filters.applicationStatus) {
      query += query
        ? `&application_status=${filters.applicationStatus}`
        : `application_status=${filters.applicationStatus}`;
    }
    dispatch(getAdmissionApplications(query));
  };

  const handleResetFilters = () => {
    setFilters({
      academicYear: "",
      academicClass: "",
      applicationStatus: "",
    });
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
      width: 300,
      filter: true,
      sortable: true,
    },
    {
      headerName: "Academic Class",
      field: "academicClass",
      width: 250,
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
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filter Applications
            </h3>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-sm font-medium text-primary hover:underline px-3 py-1.5 rounded hover:bg-primary/5 transition-colors"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Filter Card */}
        {showFilters && (
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 p-4 sm:p-6 transition-all duration-300 mb-6">
            {/* Filter Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Use the filters below to narrow down your search. Select one or
              more criteria and click "Apply Filters" to update the results.
            </p>

            {/* Filter Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Academic Year Filter */}
              <div className="flex flex-col">
                <MESelect
                  label={"Academic Year"}
                  placeholder={"Select Academic Year"}
                  items={[
                    { label: "2026-2027", value: "2026-2027" },
                    { label: "2025-2026", value: "2025-2026" },
                    { label: "2024-2025", value: "2024-2025" },
                  ]}
                  selectedValue={filters.academicYear}
                  selectVariant={variants.DARK}
                  selectedVariant={variants.DARK}
                  labelvariant={variants.DARK}
                  onValueChange={(value) =>
                    handleFilterChange("academicYear", value)
                  }
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                  Filter by academic year
                </p>
              </div>

              {/* Academic Class Filter */}
              <div className="flex flex-col">
                <MESelect
                  label={"Eduction Board"}
                  placeholder={"Select Eduction Board"}
                  items={eductionBoardsWithAcademicClasses}
                  selectedValue={selectedEductionBoard}
                  selectVariant={variants.DARK}
                  selectedVariant={variants.DARK}
                  labelvariant={variants.DARK}
                  onValueChange={(value) => dispatch(setEductionBoard(value))}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                  Filter by class/grade level
                </p>
              </div>

              {/* Academic Class Filter */}
              <div className="flex flex-col">
                <MESelect
                  label={"Academic Class"}
                  placeholder={"Select Academic Class"}
                  items={
                    _.find(
                      eductionBoardsWithAcademicClasses,
                      (item) => item.value === selectedEductionBoard
                    )?.children || []
                  }
                  selectedValue={selectedAcademicClass}
                  selectVariant={variants.DARK}
                  selectedVariant={variants.DARK}
                  labelvariant={variants.DARK}
                  onValueChange={(value) => dispatch(setSelectedAcademicClass(value))}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                  Filter by class/grade level
                </p>
              </div>

              {/* Application Status Filter */}
              <div className="flex flex-col">
                <MESelect
                  label={"Application Status"}
                  placeholder={"Select Application Status"}
                  items={[{ label: "Pending", value: "Pending" }]}
                  selectedValue={filters.applicationStatus}
                  selectVariant={variants.DARK}
                  selectedVariant={variants.DARK}
                  labelvariant={variants.DARK}
                  onValueChange={(value) =>
                    handleFilterChange("applicationStatus", value)
                  }
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                  Filter by application status
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <MEButton
                buttonVariant={variants.SUCCESS}
                onClick={handleApplyFilters}
              >
                Apply Filters
              </MEButton>
            </div>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh]">
        <MEDataTable rows={admissionApplications} columns={colDefs} />
      </div>
    </>
  );
};

export default AdmissionScreenTableData;
