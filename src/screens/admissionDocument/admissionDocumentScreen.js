// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { getAcademicClasses, getFeeTypes } from "@MERedux/fee/feeAction";

import MEAuthHoc from "@MECommonComponents/hoc/meAuthHoc";
import AdmissionDocumentScreenHeader from "@MEScreenComponents/admissionDocument/header";
// import FeeScreenAGGridTable from "@MEScreenComponents/fee/agGridTable/agGridTable";
import AdmissionDocumentScreenAGGridLoader from "@MEScreenComponents/admissionDocument/agGridTable/agGridLoader";

const AdmissionDocumentScreen = () => {
  // const dispatch = useDispatch();
  // const { feeLoader } = useSelector((state) => state.fee);

  // useEffect(() => {
  //   dispatch(getFeeTypes());
  //   dispatch(getAcademicClasses());
  // }, [dispatch]);

  return (
    <>
      <MEAuthHoc>
        <div className="mr-10">
           <AdmissionDocumentScreenHeader/>
           <AdmissionDocumentScreenAGGridLoader/>
          {/* {feeLoader ? <AdmissionDocumentScreenAGGridLoader /> : <FeeScreenAGGridTable />} */}
        </div>
      </MEAuthHoc>
    </>
  );
};

export default AdmissionDocumentScreen;
