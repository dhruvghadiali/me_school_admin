import { Trash2 } from "lucide-react";
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
  academicClassColumnTitle,
  eductionBoardSelectionLabel,
  academicClassActionColumnTitle,
  eductionBoardSelectionPlaceholder,
  academicClassCreatedByColumnTitle,
  academicClassCreatedAtColumnTitle,
  academicClassUpdatedAtColumnTitle,
  academicClassUpdatedByColumnTitle,
} from "@MELocalization/en";

import _ from "lodash";
import moment from "moment/moment";

import MESelect from "@MECommonComponents/select/meSelect";
import MEDeleteAlertDialog from "@MECommonComponents/alertDialog/deleteAlertDialog";
import AcademicClassSheet from "@MEScreenComponents/academicClass/academicClassSheet/academicClassSheet";

const FeeScreenAGGridTable = () => {
  // const { selectedEducationBoard, educationBoards, academicClasses } =
  //   useSelector((state) => state.academicClass);
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const onDeleteConfirm = (data) => {
    // if (data && data.data && data.data.id) {
    //   dispatch(deleteAcademicClasses(data.data.id));
    // }
  };

  const colDefs = [
    {
      headerName: "Action",
      cellRenderer: (data) => (
        <MEDeleteAlertDialog onConfirm={() => onDeleteConfirm(data)}>
          <Button size="icon" variant="link" className="text-danger">
            <Trash2 />
          </Button>
        </MEDeleteAlertDialog>
      ),
      width: 100,
      filter: false,
      sortable: false,
    },
    {
      headerName: "Fee Type",
      field: "academicClass",
      filter: true,
      width: 500,
    },
    {
      headerName: "Monthly Fee",
      field: "academicClass",
      filter: true,
      width: 150,
    },
    {
      headerName: "Quarterly Fee",
      field: "academicClass",
      filter: true,
      width: 150,
    },
    {
      headerName: "Half Yearly Fee",
      field: "academicClass",
      filter: true,
      width: 150,
    },
    {
      headerName: "Yearly Fee",
      field: "academicClass",
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
              items={[]}
              selectedValue={""}
              selectVariant={variants.DARK}
              selectedVariant={variants.PRIMARY}
              labelvariant={variants.DARK}
              onValueChange={(value) => dispatch(onChangeEductionBoard(value))}
            />
            <MESelect
              label={
                "Select Academic Class"
              }
              placeholder={
                i18n.exists("eductionBoardSelectionPlaceholder")
                  ? _.upperFirst(t("eductionBoardSelectionPlaceholder"))
                  : _.upperFirst(eductionBoardSelectionPlaceholder)
              }
              items={[]}
              selectedValue={""}
              selectVariant={variants.DARK}
              selectedVariant={variants.PRIMARY}
              labelvariant={variants.DARK}
              onValueChange={(value) => dispatch(onChangeEductionBoard(value))}
            />
          </div>
        </div>
        <div className="md:justify-self-end md:self-center md:mt-0 md:mb-0 mb-5 mt-6">
          <AcademicClassSheet />
        </div>
      </div>

      <div className="ag-theme-alpine w-full h-[75vh]">
        <AgGridReact rowData={[]} columnDefs={colDefs} pagination={true} />
      </div>
    </>
  );
};

FeeScreenAGGridTable.propTypes = {};

export default FeeScreenAGGridTable;
