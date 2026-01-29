import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";

import { variants } from "@MEUtils/enums";
import {
  setEductionBoard,
  setSelectedAcademicYear,
  setSelectedAcademicClass,
  setSelectedApplicationStatus,
} from "@MERedux/admission/admissionSlice";
import { getAdmissionApplications } from "@MERedux/admission/admissionAction";
import { ADMISSION_APPLICATION_STATUS } from "@MEHelpers/enums/admissionEnum";

import MESelect from "@MECommonComponents/form/select/meSelect";
import MEButton from "@MECommonComponents/form/button/meButton";

const AdmissionScreenTableMasterFilter = () => {
  const dispatch = useDispatch();
  const {
    academicYears,
    selectedAcademicYear,
    selectedEductionBoard,
    selectedAcademicClass,
    selectedApplicationStatus,
    eductionBoardsWithAcademicClasses,
  } = useSelector((state) => state.admissionApplication);

  const handleApplyFilters = () => {
    // Dispatch action to apply filters
    let query = "";
    if (selectedAcademicYear) {
      query += `academic_year=${selectedAcademicYear}`;
    }
    if (selectedAcademicClass) {
      query += query
        ? `&academic_class=${selectedAcademicClass}`
        : `academic_class=${selectedAcademicClass}`;
    }
    if (selectedApplicationStatus) {
      query += query
        ? `&status=${selectedApplicationStatus}`
        : `status=${selectedApplicationStatus}`;
    }
    dispatch(getAdmissionApplications(query));
  };

  return (
    <>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 p-4 sm:p-6 transition-all duration-300 mb-6">
        {/* Filter Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Use the filters below to narrow down your search. Select one or more criteria and click "Apply Filters" to update the results.
        </p>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Academic Year Filter */}
          <div className="flex flex-col">
            <MESelect
              label={"Academic Year"}
              placeholder={"Select Academic Year"}
              items={_.map(academicYears, (year) => ({
                label: year,
                value: year,
              }))}
              selectedValue={selectedAcademicYear}
              selectVariant={variants.DARK}
              selectedVariant={variants.DARK}
              labelvariant={variants.DARK}
              onValueChange={(value) =>
                dispatch(setSelectedAcademicYear(value))
              }
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
              Filter by academic year
            </p>
          </div>

          {/* Education Board Filter */}
          <div className="flex flex-col">
            <MESelect
              label={"Education Board"}
              placeholder={"Select Education Board"}
              items={eductionBoardsWithAcademicClasses}
              selectedValue={selectedEductionBoard}
              selectVariant={variants.DARK}
              selectedVariant={variants.DARK}
              labelvariant={variants.DARK}
              onValueChange={(value) => dispatch(setEductionBoard(value))}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
              Filter by education board
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
                  (item) => item.value === selectedEductionBoard,
                )?.children || []
              }
              selectedValue={selectedAcademicClass}
              selectVariant={variants.DARK}
              selectedVariant={variants.DARK}
              labelvariant={variants.DARK}
              onValueChange={(value) =>
                dispatch(setSelectedAcademicClass(value))
              }
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
              Filter by academic class
            </p>
          </div>

          {/* Application Status Filter */}
          <div className="flex flex-col">
            <MESelect
              label={"Application Status"}
              placeholder={"Select Application Status"}
              items={Object.values(ADMISSION_APPLICATION_STATUS).map(
                (status) => ({
                  label: _.startCase(status),
                  value: status,
                }),
              )}
              selectedValue={selectedApplicationStatus}
              selectVariant={variants.DARK}
              selectedVariant={variants.DARK}
              labelvariant={variants.DARK}
              clearable={true}
              onValueChange={(value) =>
                dispatch(setSelectedApplicationStatus(value))
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
    </>
  );
};

export default AdmissionScreenTableMasterFilter;
