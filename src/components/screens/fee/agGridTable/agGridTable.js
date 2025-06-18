import { Trash2, Edit } from "lucide-react";
import { AgGridReact } from "ag-grid-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { variants } from "@MEUtils/enums";
import { Button } from "@MEShadcnComponents/button";
import {
  onChangeEductionBoard,
  deleteAcademicClasses,
} from "@MERedux/academicClass/academicClassAction";
import {
  setEductionBoard,
  setSelectedAcademicClass,
} from "@MERedux/fee/feeSlice";
import { getFees } from "@MERedux/fee/feeAction";
import {
  academicClassColumnTitle,
  eductionBoardSelectionLabel,
  academicClassSelectionLabel,
  academicClassActionColumnTitle,
  eductionBoardSelectionPlaceholder,
  academicClassSelectionPlaceholder,
  academicClassCreatedByColumnTitle,
  academicClassCreatedAtColumnTitle,
  academicClassUpdatedAtColumnTitle,
  academicClassUpdatedByColumnTitle,
} from "@MELocalization/en";

import _ from "lodash";
import moment from "moment/moment";

import MESelect from "@MECommonComponents/select/meSelect";
import FeeSheet from "@MEScreenComponents/fee/feeSheet/feeSheet";
import MEDeleteAlertDialog from "@MECommonComponents/alertDialog/deleteAlertDialog";

const FeeScreenAGGridTable = () => {
  const {
    fees,
    selectedEductionBoard,
    selectedAcademicClass,
    eductionBoardsWithAcademicClasses,
  } = useSelector((state) => state.fee);
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const onDeleteConfirm = (data) => {
    // if (data && data.data && data.data.id) {
    //   dispatch(deleteAcademicClasses(data.data.id));
    // }
  };

  const onAcademicClassChange = (value) => {
    dispatch(setSelectedAcademicClass(value));
    dispatch(getFees({ academicClass: value }));
  };

  const pinnedBottomRowData = [
    {
      monthlyFee: _.reduce(fees, (sum, row) => sum + row.monthlyFee, 0),
      quarterlyFee: _.reduce(fees, (sum, row) => sum + row.quarterlyFee, 0),
      halfYearlyFee: _.reduce(fees, (sum, row) => sum + row.halfYearlyFee, 0),
      yearlyFee: _.reduce(fees, (sum, row) => sum + row.yearlyFee, 0),
    },
  ];

  const colDefs = [
    {
      headerName: "Action",
      field: "action",
      cellRenderer: (data) => {
        if (data.node.rowPinned === "bottom") {
          return "Total";
        }

        return (
          <div>
            <MEDeleteAlertDialog onConfirm={() => onDeleteConfirm(data)}>
              <Button size="icon" variant="link" className="text-dark">
                <Edit />
              </Button>
            </MEDeleteAlertDialog>
            <MEDeleteAlertDialog onConfirm={() => onDeleteConfirm(data)}>
              <Button size="icon" variant="link" className="text-danger">
                <Trash2 />
              </Button>
            </MEDeleteAlertDialog>
          </div>
        );
      },
      width: 100,
      filter: false,
      sortable: false,
    },
    {
      headerName: "Fee Type",
      field: "feeType",
      filter: true,
      width: 500,
    },
    {
      headerName: "Monthly Fee",
      field: "monthlyFee",
      filter: true,
      width: 150,
      aggFunc: "sum",
    },
    {
      headerName: "Quarterly Fee",
      field: "quarterlyFee",
      filter: true,
      width: 150,
    },
    {
      headerName: "Half Yearly Fee",
      field: "halfYearlyFee",
      filter: true,
      width: 150,
    },
    {
      headerName: "Yearly Fee",
      field: "yearlyFee",
      filter: true,
      width: 150,
    },
    {
      headerName: i18n.exists("academicClassCreatedByColumnTitle")
        ? _.upperFirst(t("academicClassCreatedByColumnTitle"))
        : _.upperFirst(academicClassCreatedByColumnTitle),
      field: "createdBy",
      filter: true,
    },
    {
      headerName: i18n.exists("academicClassCreatedAtColumnTitle")
        ? _.upperFirst(t("academicClassCreatedAtColumnTitle"))
        : _.upperFirst(academicClassCreatedAtColumnTitle),
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
      headerName: i18n.exists("academicClassUpdatedByColumnTitle")
        ? _.upperFirst(t("academicClassUpdatedByColumnTitle"))
        : _.upperFirst(academicClassUpdatedByColumnTitle),
      field: "updatedBy",
      filter: true,
    },
    {
      headerName: i18n.exists("academicClassUpdatedAtColumnTitle")
        ? _.upperFirst(t("academicClassUpdatedAtColumnTitle"))
        : _.upperFirst(academicClassUpdatedAtColumnTitle),
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
      <div className="md:grid md:grid-flow-row md:grid-cols-2 mt-5 ml-1 mb-2">
        <div className="md:self-center md:justify-self-start">
          <div className="md:grid md:grid-flow-row md:grid-cols-2 mt-5 ml-1 mb-2">
            <div className="w-60 pr-2">
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

            <div className="w-60 pl-2">
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
        <div className="md:justify-self-end md:self-center md:mt-0 md:mb-0 mb-5 mt-6">
          <FeeSheet />
        </div>
      </div>

      <div className="ag-theme-alpine w-full h-[75vh]">
        <AgGridReact
          rowData={fees}
          columnDefs={colDefs}
          pagination={true}
          getRowStyle={(params) => {
            if (params.node.rowPinned === "bottom") {
              return { fontWeight: "bold", backgroundColor: "#f0f0f0" };
            }
            return {};
          }}
          pinnedBottomRowData={fees.length > 0 ? pinnedBottomRowData : []}
        />
      </div>
    </>
  );
};

FeeScreenAGGridTable.propTypes = {};

export default FeeScreenAGGridTable;
