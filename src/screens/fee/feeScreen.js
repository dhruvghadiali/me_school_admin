import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAcademicClasses,
  getDefaultAcademicClasses,
} from "@MERedux/academicClass/academicClassAction";

import MEAuthHoc from "@MECommonComponents/hoc/meAuthHoc";
import FeeScreenHeader from "@MEScreenComponents/fee/header/header";
import AcademicClassScreenAGGridTable from "@MEScreenComponents/academicClass/agGridTable/agGridTable";
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
          <FeeScreenAGGridLoader />
          {/* {academicClassLoader ? (
            <FeeScreenAGGridLoader />
          ) : (
            <AcademicClassScreenAGGridTable />
          )} */}
        </div>
      </MEAuthHoc>
    </>
  );
};

export default FeeScreen;
