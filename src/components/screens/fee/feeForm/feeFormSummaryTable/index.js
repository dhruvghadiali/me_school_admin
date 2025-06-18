import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@MEShadcnComponents/table";

import TableRowData from "@MEScreenComponents/fee/feeForm/feeFormSummaryTable/tableRowData";
import TableHeaderInfo from "@MEScreenComponents/fee/feeForm/feeFormSummaryTable/tableHeaderInfo";

const FeeFormSummaryTable = ({ formData }) => {
  return (
    <>
      <p className="mt-5 mb-2 text-xl font-semibold"> Summary </p>
      <div className="bg-background flex-1 overflow-hidden rounded-md border mb-32">
        <Table>
          <TableHeader>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableHeaderInfo title="Time Period" />
              <TableHeaderInfo title="Actual Fee" />
              <TableHeaderInfo
                title="Calculated Fee"
                subtitle={"*Based on monty fee"}
              />
              <TableHeaderInfo title="Difference" />
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRowData
              data={{
                timePeriod: "Monthly",
                actualFee: formData.monthlyFee,
                calculatedFee: formData.monthlyFee * 1,
                difference: 0,
              }}
            />
            <TableRowData
              data={{
                timePeriod: "Quarterly",
                actualFee: formData.quarterlyFee,
                calculatedFee: formData.monthlyFee * 3,
                difference: formData.quarterlyFee - formData.monthlyFee * 3,
              }}
            />
            <TableRowData
              data={{
                timePeriod: "Half Yearly",
                actualFee: formData.halfYearlyFee,
                calculatedFee: formData.monthlyFee * 6,
                difference: formData.halfYearlyFee - formData.monthlyFee * 6,
              }}
            />
            <TableRowData
              data={{
                timePeriod: "Yearly",
                actualFee: formData.yearlyFee,
                calculatedFee: formData.monthlyFee * 12,
                difference: formData.yearlyFee - formData.monthlyFee * 12,
              }}
            />
          </TableBody>
        </Table>
      </div>
    </>
  );
};

FeeFormSummaryTable.propTypes = {};

export default FeeFormSummaryTable;
