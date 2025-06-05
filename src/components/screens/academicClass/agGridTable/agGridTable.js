import { useState } from "react";
import { Plus } from "lucide-react";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";

import { variants } from "@MEUtils/enums";
import { onChangeEductionBoard } from "@MERedux/academicClass/academicClassAction";

import _ from "lodash";
import moment from "moment/moment";

import MEButton from "@MECommonComponents/button/meButton";
import MESelect from "@MECommonComponents/select/meSelect";
import AcademicClassForm from "@MEScreenComponents/academicClass/academicClassForm";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@MEShadcnComponents/sheet";

import { manageAcademicClassFormSheetStatus } from "@MERedux/academicClass/academicClassSlice";

const AcademicClassScreenAGGridTable = () => {
  const {
    selectedEducationBoard,
    educationBoards,
    academicClasses,
    isAcademicClassFormSheetOpen,
  } = useSelector((state) => state.academicClass);
  const dispatch = useDispatch();

  const [colDefs, _] = useState([
    {
      headerName: "Academic Class",
      field: "academicClass",
      filter: true,
      width: 650,
    },
    {
      headerName: "Created By",
      field: "createdBy",
      filter: true,
      width: 250,
    },
    {
      headerName: "Created At",
      field: "createdAt",
      filter: "agDateColumnFilter",
      width: 200,
      valueFormatter: (params) =>
        params.value ? moment(params.value).format("DD MMM YYYY") : "",
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
      headerName: "Updated By",
      field: "updatedBy",
      filter: true,
      width: 250,
    },
    {
      headerName: "Updated At",
      field: "updatedAt",
      filter: "agDateColumnFilter",
      width: 200,
      valueFormatter: (params) =>
        params.value ? moment(params.value).format("DD MMM YYYY") : "",
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
  ]);

  return (
    <>
      <div className="grid grid-flow-row grid-cols-2 mt-5 ml-1 mb-2">
        <div className="self-center justify-self-start">
          <MESelect
            label="selected education board"
            items={educationBoards}
            placeholder="Select Education Board"
            selectedValue={selectedEducationBoard}
            selectVariant={variants.DARK}
            selectedVariant={variants.PRIMARY}
            labelvariant={variants.DARK}
            onValueChange={(value) => dispatch(onChangeEductionBoard(value))}
          />
        </div>
        <div className="justify-self-end self-center">
          <Sheet
            open={isAcademicClassFormSheetOpen}
            onOpenChange={(open) =>
              dispatch(manageAcademicClassFormSheetStatus(open))
            }
          >
            <SheetTrigger>
              <MEButton
                buttonVariant={variants.DARK}
                onClick={() =>
                  dispatch(manageAcademicClassFormSheetStatus(true))
                }
              >
                <Plus /> Add Academic Class
              </MEButton>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add new academic class</SheetTitle>
                <SheetDescription>
                  Add a new academic class to your school records here. Please
                  provide all required details before submitting.
                  <AcademicClassForm />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
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
