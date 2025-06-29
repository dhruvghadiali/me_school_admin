import { Trash2, Edit } from "lucide-react";
import { AgGridReact } from "ag-grid-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { variants } from "@MEUtils/enums";
import { Button } from "@MEShadcnComponents/button";
import { getSchoolAdmissionDocuments } from "@MERedux/admissionDocument/admissionDocumentAction";

import {
  setEductionBoard,
  setSelectedAcademicClass,
} from "@MERedux/admissionDocument/admissionDocumentSlice";
import {
  eductionBoardSelectionLabel,
  academicClassSelectionLabel,
  eductionBoardSelectionPlaceholder,
  academicClassSelectionPlaceholder,
  admissionDocumentNotesColumnTitle,
  admissionDocumentActionsColumnTitle,
  admissionDocumentCreatedByColumnTitle,
  admissionDocumentCreatedAtColumnTitle,
  admissionDocumentUpdatedByColumnTitle,
  admissionDocumentUpdatedAtColumnTitle,
  admissionDocumentIsRequiredColumnTitle,
  admissionDocumentDocumentNameColumnTitle,
} from "@MELocalization/en";

import _ from "lodash";
import moment from "moment/moment";

import MESelect from "@MECommonComponents/select/meSelect";
import AdmissionDocumentSheet from "@MEScreenComponents/admissionDocument/admissionDocumentSheet";
import MEEditAlertDialog from "@MECommonComponents/alertDialog/editAlertDialog";
import MEDeleteAlertDialog from "@MECommonComponents/alertDialog/deleteAlertDialog";

const SchoolAdmissionAGGridTable = () => {
  const {
    selectedAcademicClass,
    selectedEductionBoard,
    schoolAdmissionDocuments,
    eductionBoardsWithAcademicClasses,
  } = useSelector((state) => state.admissionDocument);
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const onDeleteConfirm = (data) => {
    // if (data && data.data && data.data.id) {
    //   dispatch(deleteFee({id: data.data.id, academicClass: selectedAcademicClass}));
    // }
  };

  const onEditConfirm = (data) => {
    // dispatch(
    //   setFeeFormData({ ...data.data, academicClass: selectedAcademicClass })
    // );
    // dispatch(manageFeeFormSheetStatus(true));
  };

  const onAcademicClassChange = (value) => {
    dispatch(setSelectedAcademicClass(value));
    dispatch(getSchoolAdmissionDocuments({ academicClass: value }));
  };

  // const pinnedBottomRowData = [
  //   {
  //     monthlyFee: _.reduce(fees, (sum, row) => sum + row.monthlyFee, 0),
  //     quarterlyFee: _.reduce(fees, (sum, row) => sum + row.quarterlyFee, 0),
  //     halfYearlyFee: _.reduce(fees, (sum, row) => sum + row.halfYearlyFee, 0),
  //     yearlyFee: _.reduce(fees, (sum, row) => sum + row.yearlyFee, 0),
  //   },
  // ];

  const colDefs = [
    {
      headerName: i18n.exists("admissionDocumentActionsColumnTitle")
        ? _.upperFirst(t("admissionDocumentActionsColumnTitle"))
        : _.upperFirst(admissionDocumentActionsColumnTitle),
      field: "action",
      cellRenderer: (data) => {
        return (
          <div>
            <MEEditAlertDialog onConfirm={() => onEditConfirm(data)}>
              <Button size="icon" variant="link" className="text-dark">
                <Edit />
              </Button>
            </MEEditAlertDialog>
            <MEDeleteAlertDialog onConfirm={() => onDeleteConfirm(data)}>
              <Button size="icon" variant="link" className="text-danger">
                <Trash2 />
              </Button>
            </MEDeleteAlertDialog>
          </div>
        );
      },
      width: 150,
      filter: false,
      sortable: false,
    },
    {
      headerName: i18n.exists("admissionDocumentDocumentNameColumnTitle")
        ? _.upperFirst(t("admissionDocumentDocumentNameColumnTitle"))
        : _.upperFirst(admissionDocumentDocumentNameColumnTitle),
      field: "admissionDocument",
      filter: true,
      width: 500,
    },
    {
      headerName: i18n.exists("admissionDocumentIsRequiredColumnTitle")
        ? _.upperFirst(t("admissionDocumentIsRequiredColumnTitle"))
        : _.upperFirst(admissionDocumentIsRequiredColumnTitle),
      field: "isRequired",
      filter: true,
      width: 150,
      aggFunc: "sum",
    },
    {
      headerName: i18n.exists("admissionDocumentNotesColumnTitle")
        ? _.upperFirst(t("admissionDocumentNotesColumnTitle"))
        : _.upperFirst(admissionDocumentNotesColumnTitle),
      field: "notes",
      filter: true,
      width: 500,
    },
    {
      headerName: i18n.exists("admissionDocumentCreatedByColumnTitle")
        ? _.upperFirst(t("admissionDocumentCreatedByColumnTitle"))
        : _.upperFirst(admissionDocumentCreatedByColumnTitle),
      field: "createdBy",
      filter: true,
    },
    {
      headerName: i18n.exists("admissionDocumentCreatedAtColumnTitle")
        ? _.upperFirst(t("admissionDocumentCreatedAtColumnTitle"))
        : _.upperFirst(admissionDocumentCreatedAtColumnTitle),
      field: "createdAt",
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          if (!cellValue) return -1;
          const cellDate = moment(cellValue, "DD MMM YYYY")
            .startOf("day")
            .toDate();
          if (cellDate < filterLocalDateAtMidnight) return -1;
          if (cellDate > filterLocalDateAtMidnight) return 1;
          return 0;
        },
      },
    },
    {
      headerName: i18n.exists("admissionDocumentUpdatedByColumnTitle")
        ? _.upperFirst(t("admissionDocumentUpdatedByColumnTitle"))
        : _.upperFirst(admissionDocumentUpdatedByColumnTitle),
      field: "updatedBy",
      filter: true,
    },
    {
      headerName: i18n.exists("admissionDocumentUpdatedAtColumnTitle")
        ? _.upperFirst(t("admissionDocumentUpdatedAtColumnTitle"))
        : _.upperFirst(admissionDocumentUpdatedAtColumnTitle),
      field: "updatedAt",
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          if (!cellValue) return -1;
          const cellDate = moment(cellValue, "DD MMM YYYY")
            .startOf("day")
            .toDate();
          if (cellDate < filterLocalDateAtMidnight) return -1;
          if (cellDate > filterLocalDateAtMidnight) return 1;
          return 0;
        },
      },
    },
  ];

  return (
    <>
      <div className="lg:grid lg:grid-flow-row lg:grid-cols-2 mt-5 ml-1 mb-2">
        <div className="lg:self-center lg:justify-self-start">
          <div className="lg:grid lg:grid-flow-row lg:grid-cols-2 mt-5 ml-1 mb-2">
            <div className="xl:w-60 lg:pr-2">
              <MESelect
                label={
                  i18n.exists("eductionBoardSelectionLabel")
                    ? _.upperFirst(t("eductionBoardSelectionLabel"))
                    : _.upperFirst(eductionBoardSelectionLabel)
                }
                placeholder={
                  i18n.exists("eductionBoardSelectionPlaceholder")
                    ? _.upperFirst(t("eductionBoardSelectionPlaceholder"))
                    : _.upperFirst(eductionBoardSelectionPlaceholder)
                }
                items={eductionBoardsWithAcademicClasses}
                selectedValue={selectedEductionBoard}
                selectVariant={variants.DARK}
                selectedVariant={variants.DARK}
                labelvariant={variants.DARK}
                onValueChange={(value) => dispatch(setEductionBoard(value))}
              />
            </div>
            <div className="xl:w-60 lg:pl-2">
              <MESelect
                label={
                  i18n.exists("academicClassSelectionLabel")
                    ? _.upperFirst(t("academicClassSelectionLabel"))
                    : _.upperFirst(academicClassSelectionLabel)
                }
                placeholder={
                  i18n.exists("academicClassSelectionPlaceholder")
                    ? _.upperFirst(t("academicClassSelectionPlaceholder"))
                    : _.upperFirst(academicClassSelectionPlaceholder)
                }
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
                onValueChange={(value) => onAcademicClassChange(value)}
              />
            </div>
          </div>
        </div>
        <div className="justify-self-end self-center lg:mt-0 lg:mb-0 mb-5 mt-6 ">
          <div className="w-30 pl-2">
            <AdmissionDocumentSheet />
          </div>
        </div>
      </div>

      <div className="ag-theme-alpine w-full h-[75vh]">
        <AgGridReact
          rowData={schoolAdmissionDocuments}
          columnDefs={colDefs}
          pagination={true}
        />
      </div>
    </>
  );
};

SchoolAdmissionAGGridTable.propTypes = {};

export default SchoolAdmissionAGGridTable;
