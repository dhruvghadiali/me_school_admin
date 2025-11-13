import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAcademicClasses, getFeeTypes } from "@MERedux/fee/feeAction";

import MEAuthHoc from "@MECommonComponents/hoc/meAuthHoc";
import FeeScreenHeader from "@MEScreenComponents/fee/header/header";
import FeeScreenAGGridTable from "@MEScreenComponents/fee/agGridTable/agGridTable";
import FeeScreenAGGridLoader from "@MEScreenComponents/fee/agGridTable/agGridLoader";

const FeeScreen = () => {
  const dispatch = useDispatch();
  const { feeLoader } = useSelector((state) => state.fee);

  useEffect(() => {
    dispatch(getFeeTypes());
    dispatch(getAcademicClasses());
  }, [dispatch]);

  return (
    <>
      <MEAuthHoc>
        <div className="mr-10">
          <FeeScreenHeader/>
          {feeLoader ? <FeeScreenAGGridLoader /> : <FeeScreenAGGridTable />}
        </div>
      </MEAuthHoc>
    </>
  );
};

export default FeeScreen;
