import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAcademicClasses,
  getDefaultAcademicClasses,
} from "@MERedux/academicClass/academicClassAction";

import MESidebar from "@MECommonComponents/sidebar/meSidebar";
import AcademicClassScreenHeader from "@MEScreenComponents/academicClass/header/header";
import AcademicClassScreenTableData from "@MEScreenComponents/academicClass/tableData";
import AcademicClassScreenTableDataLoader from "@MEScreenComponents/academicClass/tableData/tableDataLoader";

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
        <AcademicClassScreenTableDataLoader />
      ) : (
        <AcademicClassScreenTableData />
      )}
    </MESidebar>
  );
};

export default AcademicClassPage;
