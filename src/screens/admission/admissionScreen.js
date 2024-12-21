import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Eye, ListFilterIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@MEShadcnComponents/dropdown-menu";
import { Button } from "@MEShadcnComponents/button";

import moment from "moment/moment";
import AuthHoc from "@MECommonComponents/authHoc/authHoc";
import MESidebar from "@MECommonComponents/sidebar/meSidebar";
import MEButton from "@/components/common/button/meButton";

const AdmissionScreen = () => {
  const [rowData, setRowData] = useState([
    {
      applicationNumber: "Admission Screen",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
    {
      applicationNumber: "AP-1234-ANK-123-10-12-2024",
      applicationStatus: "Pendding",
      studentName: "Dhruvkumar Yogeshkumar Ghadiali",
      grade: "UKG",
      registrationDate: "2024-01-11",
    },
  ]);

  const [colDefs, _] = useState([
    {
      headerName: "Action",
      cellRenderer: (data) => (
        <MEButton
          size="icon"
          variant="link"
          className="text-dark"
          onClick={() => console.log("On Click", data)}
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
    <>
      <AuthHoc>
        <MESidebar>
          <p className="text-3xl font-semibold">Admission Hub</p>
          <p className="text-sm mt-1">
            Seamlessly review, manage, and take actions on admission requests
            with all the details you need in one place.
          </p>
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
          <div className="ag-theme-alpine w-full h-[700px] pr-10 mt-5">
            <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
              pagination={true}
            />
          </div>
        </MESidebar>
      </AuthHoc>
    </>
  );
};

export default AdmissionScreen;
