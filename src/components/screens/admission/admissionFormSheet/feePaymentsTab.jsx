import { useSelector } from "react-redux";
import { IndianRupeeIcon } from "lucide-react";

import _ from "lodash";

import MEDataTable from "@MECommonComponents/table/meDataTable";
import MEAlertCardComponent from "@MECommonComponents/card/alertCard";

const FeePaymentsTab = () => {
  const { selectedAdmissionApplication } = useSelector(
    (state) => state.admissionApplication,
  );

  const feePayments = _.get(selectedAdmissionApplication, "feePayments", []);

  if (!feePayments || feePayments.length === 0) {
    return (
      <MEAlertCardComponent
        icon={
          <IndianRupeeIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary/50" />
        }
        alertText="No Fee Payments"
        alertMessage="Fee payment details will be displayed here once available"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Total fee summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Monthly", field: "monthlyFee" },
          { label: "Quarterly", field: "quarterlyFee" },
          { label: "Half Yearly", field: "halfYearlyFee" },
          { label: "Yearly", field: "yearlyFee" },
        ].map(({ label, field }) => {
          const total = _.sumBy(feePayments, (row) => Number(row[field]) || 0);
          return (
            <div
              key={field}
              className="flex items-center rounded-lg border border-border bg-card px-4 py-3 shadow-sm"
            >
              <p className="text-xs text-primary/60 mr-5">{label}</p>
              <IndianRupeeIcon className="w-3 h-3 shrink-0 font-semibold text-primary " />
              <p className="text-sm font-semibold text-primary">
                {total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </p>
            </div>
          );
        })}
      </div>

      <MEDataTable
        rows={feePayments}
        columns={[
          {
            headerName: "Fee Type",
            field: "feeType",
            width: 150,
            filter: false,
            sortable: false,
          },
          {
            headerName: "Monthly Fee",
            field: "monthlyFee",
            width: 150,
            filter: false,
            sortable: false,
          },
          {
            headerName: "Quarterly Fee",
            field: "quarterlyFee",
            width: 150,
            filter: false,
            sortable: false,
          },
          {
            headerName: "Half Yearly Fee",
            field: "halfYearlyFee",
            width: 150,
            filter: false,
            sortable: false,
          },
          {
            headerName: "Yearly Fee",
            field: "yearlyFee",
            width: 150,
            filter: false,
            sortable: false,
          },
        ]}
      />
    </div>
  );
};

export default FeePaymentsTab;
