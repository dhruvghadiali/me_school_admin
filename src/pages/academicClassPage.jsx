import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAcademicClasses,
  getDefaultAcademicClasses,
} from "@MERedux/academicClass/academicClassAction";

import MESidebar from "@MECommonComponents/sidebar/meSidebar";

const AcademicClassPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAcademicClasses());
    dispatch(getDefaultAcademicClasses());
  }, [dispatch]);

  return (
    <MESidebar>
      <h1>Academic Class</h1>
    </MESidebar>
  );
};

export default AcademicClassPage;
