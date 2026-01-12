import { Button } from "@MEShadcnComponents/button";
import { Eye, Trash2, CheckCircle, Clock, XCircle } from "lucide-react";

import MEDataTable from "@/components/common/table/meDataTable";

const AdmissionScreenTableData = () => {
  const admissionApplications = [
    {
      id: 1,
      name: "Aarav Sharma",
      email: "aarav.sharma@email.com",
      class: "Class IX",
      appliedDate: "2025-01-10",
      status: "Pending",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@email.com",
      class: "Class X",
      appliedDate: "2025-01-09",
      status: "Approved",
    },
    {
      id: 3,
      name: "Rohan Gupta",
      email: "rohan.gupta@email.com",
      class: "Class XI",
      appliedDate: "2025-01-08",
      status: "Rejected",
    },
    {
      id: 4,
      name: "Neha Verma",
      email: "neha.verma@email.com",
      class: "Class IX",
      appliedDate: "2025-01-07",
      status: "Pending",
    },
    {
      id: 5,
      name: "Arjun Singh",
      email: "arjun.singh@email.com",
      class: "Class X",
      appliedDate: "2025-01-06",
      status: "Approved",
    },
    {
      id: 6,
      name: "Divya Kapoor",
      email: "divya.kapoor@email.com",
      class: "Class XII",
      appliedDate: "2025-01-05",
      status: "Pending",
    },
  ];

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
    { headerName: "Student Name", field: "name", flex: 1, minWidth: 150 },
    { headerName: "Application Number", field: "email", flex: 1, minWidth: 200 },
    { headerName: "Academic Class", field: "class", flex: 1, minWidth: 120 },
    {
      headerName: "Applied Date",
      field: "appliedDate",
      flex: 1,
      minWidth: 130,
    },
    {
      headerName: "Status",
      field: "status",
      flex: 1,
      minWidth: 120,
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      Approved: {
        icon: CheckCircle,
        color: "text-green-600 dark:text-green-400",
      },
      Rejected: { icon: XCircle, color: "text-red-600 dark:text-red-400" },
      Pending: { icon: Clock, color: "text-yellow-600 dark:text-yellow-400" },
    };

    const config = statusConfig[status] || statusConfig.Pending;
    const IconComponent = config.icon;

    return (
      <div className="flex items-center gap-1">
        <IconComponent className={`w-4 h-4 ${config.color}`} />
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
          {status}
        </span>
      </div>
    );
  };

  return (
    <div className="mt-5">
      <div className="ag-theme-alpine w-full h-[75vh]">
        <MEDataTable rows={admissionApplications} columns={colDefs} />
      </div>
    </div>
  );
};

export default AdmissionScreenTableData;
