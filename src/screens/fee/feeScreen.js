import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAcademicClasses,
} from "@MERedux/academicClass/academicClassAction";

import MEAuthHoc from "@MECommonComponents/hoc/meAuthHoc";
import FeeScreenHeader from "@MEScreenComponents/fee/header/header";
import FeeScreenAGGridTable from "@MEScreenComponents/fee/agGridTable/agGridTable";
import FeeScreenAGGridLoader from "@MEScreenComponents/fee/agGridTable/agGridLoader";

const FeeScreen = () => {
  const dispatch = useDispatch();
  // const { academicClassLoader } = useSelector((state) => state.academicClass);

  useEffect(() => {
    // dispatch(getAcademicClasses());
    // dispatch(getDefaultAcademicClasses());
  }, []);

  return (
    <>
      <MEAuthHoc>
        <div className="mr-10">
          <FeeScreenHeader />
          {/* {academicClassLoader ? (
            <FeeScreenAGGridLoader />
          ) : ( */}
            <FeeScreenAGGridTable />
          {/* )} */}
        </div>
      </MEAuthHoc>
    </>
  );
};

export default FeeScreen;
