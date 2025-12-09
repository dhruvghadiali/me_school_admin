import { IndianRupee } from "lucide-react";

import { TableRow, TableCell } from "@MEShadcnComponents/table";

import PropTypes from "prop-types";

const TableRowData = (props) => {
  const { timePeriod, actualFee, calculatedFee, difference } = props.data;

  return (
    <TableRow
      className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r"
      key={timePeriod}
    >
      <TableCell className="py-2">{timePeriod}</TableCell>
      <TableCell className="py-2">
        <div className="flex row-2 items-center">
          <IndianRupee size={12} />
          {actualFee}
        </div>
      </TableCell>
      <TableCell className="py-2">
        <div className="flex row-2 items-center">
          <IndianRupee size={12} />
          {calculatedFee}
        </div>
      </TableCell>
      <TableCell className="py-2">
        <div className="flex row-2 items-center">
          <IndianRupee size={12} />
          {Math.abs(difference)}
        </div>
      </TableCell>
    </TableRow>
  );
};

TableRowData.propTypes = {
  timePeriod: PropTypes.string.isRequired,
  actualFee: PropTypes.number.isRequired,
  calculatedFee: PropTypes.number.isRequired,
  difference: PropTypes.number.isRequired,
};

export default TableRowData;
