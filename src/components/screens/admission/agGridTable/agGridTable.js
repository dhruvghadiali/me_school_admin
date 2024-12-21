import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, ListFilterIcon } from "lucide-react";

import { Button } from "@MEShadcnComponents/button";
import { admissionScreenContainerType } from "@MEUtils/enums";
import { setAdmissionScreenContainerType } from "@MERedux/admission/admissionSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@MEShadcnComponents/dropdown-menu";

import moment from "moment/moment";
import MEButton from "@MECommonComponents/button/meButton";

const AdmissionScreenAGGridTable = () => {
  const { tableData } = useSelector((state) => state.admission);
  const dispatch = useDispatch();

  const onViewAdmissionFormDetail = (data) => {
    dispatch(
      setAdmissionScreenContainerType(
        admissionScreenContainerType.FORMDETAILCARD
      )
    );
  };

  const [colDefs, _] = useState([
    {
      headerName: "Action",
      cellRenderer: (data) => (
        <MEButton
          size="icon"
          variant="link"
          className="text-dark"
          onClick={() => onViewAdmissionFormDetail(data)}
        >
          <Eye />
        </MEButton>
      ),
      width: 80,
      filter: false,
      sortable: false,
    },
    {
      headerName: "Application Number",
      field: "applicationNumber",
      filter: true,
      width: 400,
    },
    {
      headerName: "Application Status",
      field: "applicationStatus",
      filter: true,
      width: 180,
    },
    {
      headerName: "Student Name",
      field: "studentName",
      filter: true,
      width: 550,
    },
    { headerName: "Grade", field: "grade", filter: true, width: 170 },
    {
      headerName: "Registration Date",
      field: "registrationDate",
      width: 200,
      filter: "agDateColumnFilter",
      cellRenderer: (data) => {
        return moment(data.value).format("DD MMMM YYYY");
      },
    },
  ]);

  return (
    <div className="pr-10">
      <div className="justify-self-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="icon">
              <ListFilterIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Form Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>New</DropdownMenuItem>
              <DropdownMenuItem>Approved</DropdownMenuItem>
              <DropdownMenuItem>Rejected</DropdownMenuItem>
              <DropdownMenuItem>Canceled</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="ag-theme-alpine w-full h-[700px]  mt-5">
        <AgGridReact
          rowData={tableData}
          columnDefs={colDefs}
          pagination={true}
        />
      </div>
    </div>
  );
};

AdmissionScreenAGGridTable.propTypes = {};

export default AdmissionScreenAGGridTable;
