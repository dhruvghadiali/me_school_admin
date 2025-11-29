import { Trash2 } from "lucide-react";
import { AgGridReact } from "ag-grid-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { variants } from "@MEUtils/enums";
import { Button } from "@MEShadcnComponents/button";
// import {
//   onChangeEductionBoard,
//   deleteAcademicClasses,
// } from "@MERedux/academicClass/academicClassAction";
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

import MESelect from "@MECommonComponents/form/select/meSelect";
import MEDeleteAlertDialog from "@MECommonComponents/alertDialog/deleteAlertDialog";
import AcademicClassSheet from "@MEScreenComponents/academicClass/academicClassSheet/academicClassSheet";

const AcademicClassScreenAGGridTable = () => {
  const { selectedEducationBoard, educationBoards, academicClasses } =
    useSelector((state) => state.academicClass);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onDeleteConfirm = (data) => {
    if (data && data.data && data.data.id) {
      // dispatch(deleteAcademicClasses(data.data.id));
    }
  };

  const colDefs = [
    {
      headerName: _.upperFirst(
        t("academicClassActionColumnTitle", {
          defaultValue: academicClassActionColumnTitle,
        })
      ),
      field: "actions",
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
      headerName: _.upperFirst(
        t("academicClassColumnTitle", {
          defaultValue: academicClassColumnTitle,
        })
      ),
      field: "academicClass",
      filter: true,
      flex: 1,
    },
    {
      headerName: _.upperFirst(
        t("academicClassCreatedByColumnTitle", {
          defaultValue: academicClassCreatedByColumnTitle,
        })
      ),
      field: "createdBy",
      filter: true,
    },
    {
      headerName: _.upperFirst(
        t("academicClassCreatedAtColumnTitle", {
          defaultValue: academicClassCreatedAtColumnTitle,
        })
      ),
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
      headerName: _.upperFirst(
        t("academicClassUpdatedByColumnTitle", {
          defaultValue: academicClassUpdatedByColumnTitle,
        })
      ),
      field: "updatedBy",
      filter: true,
    },
    {
      headerName: _.upperFirst(
        t("academicClassUpdatedAtColumnTitle", {
          defaultValue: academicClassUpdatedAtColumnTitle,
        })
      ),
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

  console.log("educationBoards", educationBoards);

  return (
    <>
      <div className="md:grid md:grid-flow-row md:grid-cols-2 mt-5 ml-1 mb-2">
        <div className="md:self-center md:justify-self-start">
          <div className="w-60">
            <MESelect
              items={educationBoards}
              selectedValue={selectedEducationBoard}
              selectVariant={variants.DARK}
              selectedVariant={variants.DARK}
              labelvariant={variants.DARK}
              label={_.upperFirst(
                t("eductionBoardSelectionLabel", {
                  defaultValue: eductionBoardSelectionLabel,
                })
              )}
              placeholder={_.upperFirst(
                t("eductionBoardSelectionPlaceholder", {
                  defaultValue: eductionBoardSelectionPlaceholder,
                })
              )}
              // onValueChange={(value) => dispatch(onChangeEductionBoard(value))}
            />
          </div>
        </div>
        <div className="md:justify-self-end md:self-center md:mt-0 md:mb-0 mb-5 mt-6">
          <AcademicClassSheet />
        </div>
      </div>

      <div className="ag-theme-alpine w-full h-[75vh]">
        <AgGridReact
          rowData={academicClasses}
          columnDefs={colDefs}
          pagination={true}
        />
      </div>
    </>
  );
};

AcademicClassScreenAGGridTable.propTypes = {};

export default AcademicClassScreenAGGridTable;
