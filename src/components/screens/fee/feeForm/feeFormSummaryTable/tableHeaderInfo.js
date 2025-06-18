import { TableHead } from "@MEShadcnComponents/table";

import PropTypes from "prop-types";

const TableHeaderInfo = ({ title, subtitle }) => {
  return <TableHead className="h-9 py-2 w-52 align-top">
    {title}
    <p className="text-xxs text-danger "> {subtitle} </p>
  </TableHead>;
};

TableHeaderInfo.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default TableHeaderInfo;
