import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAcademicClasses,
  getDefaultAcademicClasses,
} from "@MERedux/academicClass/academicClassAction";

import MEAuthHoc from "@MECommonComponents/hoc/meAuthHoc";
import AcademicClassScreenHeader from "@MEScreenComponents/academicClass/header/header";
import AcademicClassScreenAGGridTable from "@MEScreenComponents/academicClass/agGridTable/agGridTable";
import AcademicClassScreenAGGridLoader from "@MEScreenComponents/academicClass/agGridTable/agGridLoader";

const AcademicClassScreen = () => {
  const dispatch = useDispatch();
  const { academicClassLoader } = useSelector((state) => state.academicClass);

  useEffect(() => {
    dispatch(getAcademicClasses());
    dispatch(getDefaultAcademicClasses());
  }, [dispatch]);

  return (
    <>
      <MEAuthHoc>
        <div className="mr-10">
          <AcademicClassScreenHeader />
          {academicClassLoader ? (
            <AcademicClassScreenAGGridLoader />
          ) : (
            <AcademicClassScreenAGGridTable />
          )}
        </div>
      </MEAuthHoc>
    </>
  );
};

export default AcademicClassScreen;
