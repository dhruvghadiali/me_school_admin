import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { currentAcademicSession } from "@MEUtils/utility";
import {
  getAdmissionApplications,
  getAcademicClasses,
} from "@MERedux/admission/admissionAction";

import AdmissionScreenHeader from "@MEScreenComponents/admission/header";
import AdmissionScreenTableData from "@MEScreenComponents/admission/tableData";
import AdmissionScreenTableDataLoader from "@MEScreenComponents/admission/tableData/tableDataLoader";

const AdmissionPage = () => {
  const dispatch = useDispatch();

  const { admissionApplicationsLoader } = useSelector(
    (state) => state.admissionApplication
  );

  useEffect(() => {
    dispatch(getAcademicClasses());
    dispatch(getAdmissionApplications(`academic_year=${currentAcademicSession()}`));
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
