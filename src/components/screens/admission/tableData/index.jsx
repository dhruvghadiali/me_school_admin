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
      width: 400,
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
      headerName: "Applied Date",
      field: "createdAt",
      width: 250,
      filterType: "dateColumnFilter",
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
