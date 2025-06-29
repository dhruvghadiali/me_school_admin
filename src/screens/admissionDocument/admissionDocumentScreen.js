import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAcademicClasses, getAdmissionDocuments } from "@MERedux/admissionDocument/admissionDocumentAction";

import MEAuthHoc from "@MECommonComponents/hoc/meAuthHoc";
import AdmissionDocumentScreenHeader from "@MEScreenComponents/admissionDocument/header";
// import FeeScreenAGGridTable from "@MEScreenComponents/fee/agGridTable/agGridTable";
import AdmissionDocumentScreenAGGridLoader from "@MEScreenComponents/admissionDocument/agGridTable/agGridLoader";

const AdmissionDocumentScreen = () => {
  const dispatch = useDispatch();
  const { admissionDocumentLoader } = useSelector((state) => state.admissionDocument);

  useEffect(() => {
    dispatch(getAdmissionDocuments());
    dispatch(getAcademicClasses());
  }, [dispatch]);

  return (
    <>
      <MEAuthHoc>
        <div className="mr-10">
          <AdmissionDocumentScreenHeader />
          {admissionDocumentLoader ? <AdmissionDocumentScreenAGGridLoader /> : <div/>}
        </div>
      </MEAuthHoc>
    </>
  );
};

export default AdmissionDocumentScreen;
