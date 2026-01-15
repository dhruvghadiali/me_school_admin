import { useSelector } from "react-redux";
import { Eye, Trash2, CheckCircle, Clock, XCircle } from "lucide-react";


import { Button } from "@MEShadcnComponents/button";

import MEDataTable from "@/components/common/table/meDataTable";

const AdmissionScreenTableData = () => {
  const { admissionApplications } = useSelector(
    (state) => state.admissionApplication
  );

  const colDefs = [
    {
      headerName: "Actions",
      field: "actions",
      flex: 1,
      minWidth: 150,
      cellRenderer: (params) => (
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="link"
            className="text-primary"
            onClick={() => {}}
          >
            <Eye />
          </Button>
          <Button
            size="icon"
            variant="link"
            className="text-danger"
            onClick={() => {}}
          >
            <Trash2 />
          </Button>
        </div>
      ),
    },
    { headerName: "Student Name", field: "applicantName", filter: true, sortable: true },
    {
      headerName: "Application Number",
      field: "applicationNumber",
      filter: true,
      sortable: true,
    },
    { headerName: "Academic Class", field: "academicClass", filter: true, sortable: true },
    {
      headerName: "Applied Date",
      field: "createdAt",
      filter: true,
      filterType: "dateColumnFilter",
      sortable: true
    },
    {
      headerName: "Status",
      field: "status",
      filter: true,
      sortable: true,
    },
  ];


  return (
    <div className="mt-5">
      <div className="w-full h-[75vh]">
        <MEDataTable rows={admissionApplications} columns={colDefs} />
      </div>
    </div>
  );
};

export default AdmissionScreenTableData;
