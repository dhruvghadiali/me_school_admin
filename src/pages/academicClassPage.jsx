import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAcademicClasses,
  getDefaultAcademicClasses,
} from "@MERedux/academicClass/academicClassAction";

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
    <>
      <AcademicClassScreenHeader />
      {academicClassLoader ? (
        <AcademicClassScreenTableDataLoader />
      ) : (
        <AcademicClassScreenTableData />
      )}
    </>
  );
};

export default AcademicClassPage;
