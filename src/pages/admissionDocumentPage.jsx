import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAcademicClasses,
  getAdmissionDocuments,
} from "@MERedux/admissionDocument/admissionDocumentAction";

import AdmissionDocumentScreenHeader from "@MEScreenComponents/admissionDocument/header";
import SchoolAdmissionTableData from "@MEScreenComponents/admissionDocument/tableData";
import AdmissionDocumentScreenTableDataLoader from "@MEScreenComponents/admissionDocument/tableData/tableDataLoader";

const AdmissionDocumentPage = () => {
  const dispatch = useDispatch();
  const { admissionDocumentLoader } = useSelector(
    (state) => state.admissionDocument
  );

  useEffect(() => {
    dispatch(getAdmissionDocuments());
    dispatch(getAcademicClasses());
  }, [dispatch]);

  return (
    <>
      <AdmissionDocumentScreenHeader />
      {admissionDocumentLoader ? <AdmissionDocumentScreenTableDataLoader/> : <SchoolAdmissionTableData />}
    </>
  );
};

export default AdmissionDocumentPage;
