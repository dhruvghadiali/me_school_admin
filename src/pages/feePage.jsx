import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAcademicClasses, getFeeTypes } from "@MERedux/fee/feeAction";

import MESidebar from "@MECommonComponents/sidebar/meSidebar";
import FeeScreenHeader from "@MEScreenComponents/fee/header";
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
       <FeeScreenHeader/>
       <FeeScreenTableDataLoader/>
    </MESidebar>
  );
};

export default FeePage;
