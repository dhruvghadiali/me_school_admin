import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { currentAcademicSession } from "@MEUtils/utility";
import {
  getAcademicClasses,
  getAdmissionApplications,
} from "@MERedux/admission/admissionAction";
import {
  setAcademicYears,
  setSelectedAcademicYear,
} from "@MERedux/admission/admissionSlice";

import AdmissionScreenHeader from "@MEScreenComponents/admission/header";
import AdmissionScreenTableData from "@MEScreenComponents/admission/tableData";
import AdmissionScreenTableDataLoader from "@MEScreenComponents/admission/tableData/tableDataLoader";

const AdmissionPage = () => {
  const dispatch = useDispatch();

  const { admissionApplicationsLoader } = useSelector(
    (state) => state.admissionApplication
  );

  useEffect(() => {
    let year = currentAcademicSession();
    dispatch(getAcademicClasses());
    dispatch(getAdmissionApplications(`academic_year=${year}`));
    dispatch(setAcademicYears(currentAcademicSession(3)));
    dispatch(setSelectedAcademicYear(year));
  }, [dispatch]);

  return (
    <>
      <AdmissionScreenHeader />
      {admissionApplicationsLoader ? (
        <AdmissionScreenTableDataLoader />
      ) : (
        <AdmissionScreenTableData />
      )}
    </>
  );
};

export default AdmissionPage;
