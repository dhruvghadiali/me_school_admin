import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAcademicClasses, getFeeTypes } from "@MERedux/fee/feeAction";

import FeeScreenHeader from "@MEScreenComponents/fee/header";
import MESidebar from "@MECommonComponents/sidebar/meSidebar";
import FeeScreenTableData from "@/components/screens/fee/tableData";
import FeeScreenTableDataLoader from "@MEScreenComponents/fee/tableData/tableDataLoader";

const FeePage = () => {
  const dispatch = useDispatch();
  const { feeLoader } = useSelector((state) => state.fee);

  useEffect(() => {
    dispatch(getFeeTypes());
    dispatch(getAcademicClasses());
  }, [dispatch]);

  return (
    <MESidebar>
      <FeeScreenHeader />
      {feeLoader ? <FeeScreenTableDataLoader /> : <FeeScreenTableData />}
    </MESidebar>
  );
};

export default FeePage;
