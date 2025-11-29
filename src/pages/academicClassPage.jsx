import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAcademicClasses,
  getDefaultAcademicClasses,
} from "@MERedux/academicClass/academicClassAction";

import MESidebar from "@MECommonComponents/sidebar/meSidebar";
import AcademicClassScreenHeader from "@MEScreenComponents/academicClass/header/header";
import AcademicClassScreenAGGridTable from "@MEScreenComponents/academicClass/agGridTable/agGridTable";
import AcademicClassScreenAGGridLoader from "@MEScreenComponents/academicClass/agGridTable/agGridLoader";

const AcademicClassPage = () => {
  const dispatch = useDispatch();
  const { academicClassLoader } = useSelector((state) => state.academicClass);

  useEffect(() => {
    dispatch(getAcademicClasses());
    dispatch(getDefaultAcademicClasses());
  }, [dispatch]);

  return (
    <MESidebar>
      <AcademicClassScreenHeader />
      {academicClassLoader ? (
        <AcademicClassScreenAGGridLoader />
      ) : (
        <AcademicClassScreenAGGridTable />
      )}
    </MESidebar>
  );
};

export default AcademicClassPage;
